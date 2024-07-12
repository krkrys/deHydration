using Application.Services;
using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
            var patients = await _patientService.GetAll();
            return Ok(patients);
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
        public async Task<IActionResult> Post([FromBody] PatientDto patientDto)
        {
            var createdPatient = await _patientService.Create(patientDto.Name, patientDto.Surname, patientDto.PhoneNumber, patientDto.StandardWeight);
            return Ok(createdPatient);
        }
        
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, string phoneNumber, int standardWeight)
        {
            var updatedPatient = await _patientService.Update(id, phoneNumber, standardWeight);
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
    }
}
