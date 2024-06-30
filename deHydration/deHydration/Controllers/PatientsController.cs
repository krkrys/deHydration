using Application.Services;
using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DehydrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            //var invoices = await _patientService.GetAllAsync();
            return Ok();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PatientDto patientDto)
        {
            var createdPatient = await _patientService.Create(patientDto.Name, patientDto.Surname, patientDto.PhoneNumber, patientDto.StandardWeight);
            return Ok(createdPatient);
        }



        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
