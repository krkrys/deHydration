using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Persistence.Repository;

namespace DehydrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IRegisterRepository _repository;
        public LoginController(IConfiguration config, IRegisterRepository repository)
        {
            _config = config;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login(UserLoginDTO userLogin)
        {
            var mapUser = new LoginModel()
            {
                Username = userLogin.Username,
                Password = userLogin.Password,
                Role = ""
            };
            var user = await AuthenticateDb(mapUser);
            //var user = Authenticate(mapUser);
            if (user != null)
            {
                //var syncUser = await user;
                var token = GenerateToken(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }

        // To generate token
        private string GenerateToken(LoginModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Username),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //To authenticate user
        private LoginModel Authenticate(LoginModel userLogin)
        {
            var currentUser = UserConstants.Users.FirstOrDefault(x => x.Username.ToLower() ==
                userLogin.Username.ToLower() && x.Password == userLogin.Password);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        private async Task<LoginModel> AuthenticateDb(LoginModel userLogin)
        {
            var users = await _repository.GetAllAsync();
            var user = users.SingleOrDefault(x => x.Name == userLogin.Username && x.Password == userLogin.Password);
            if (user != null)
            {
                var lModel = new LoginModel()
                {
                    Username = user.Name,
                    Password = user.Password,
                    Role = "Admin"
                };
                return lModel;
            }
            return null;
        }
    }
}
