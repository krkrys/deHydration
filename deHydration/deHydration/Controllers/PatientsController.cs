using Application.Services;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DehydrationApp.Dto;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Collections.Generic;

namespace DehydrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;
        }
        
        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var currentUser = GetCurrentUser();
            var patients = await _patientService.GetAll();
            var currentPatients = patients.Where(p => p.DoctorId == currentUser.Id);
            var patientsShow = currentPatients.Select(PatientShowDto.Create);
            return Ok(patientsShow);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var patient = await _patientService.GetById(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }
        

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PatientRegisterDto patientRegisterDtoDto)
        {
            var createdPatient = await _patientService.Create(patientRegisterDtoDto.Name, patientRegisterDtoDto.Surname, patientRegisterDtoDto.PhoneNumber, patientRegisterDtoDto.StandardWeight, patientRegisterDtoDto.DoctorId);
            return Ok(createdPatient);
        }
        
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] PatientUpdateDto patientUpdateDto, [FromRoute] int id)
        {
            var updatedPatient = await _patientService.Update(id, patientUpdateDto.PhoneNumber, patientUpdateDto.StandardWeight);
            if (!updatedPatient)
            {
                return NotFound();
            }
            return Ok(updatedPatient);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _patientService.DeleteById(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        private LoginModel GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new LoginModel
                {
                    Id = int.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value),
                    Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value,
                    Role = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
                };
            }
            return null;
        }
    }
}
