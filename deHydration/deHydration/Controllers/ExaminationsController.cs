using Application.Services;
using DehydrationApp.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DehydrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExaminationsController : ControllerBase
    {
        private readonly IExaminationService _examinationService;
        private readonly IPatientService _patientService;

        public ExaminationsController(IExaminationService examinationService, IPatientService patientService)
        {
            _examinationService = examinationService;
            _patientService = patientService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var currentUser = GetCurrentUser();

            var patients = await _patientService.GetAll();
            var currentPatientsId = patients.Where(p => p.DoctorId == currentUser.Id).Select(p => p.PatientId);
            var examinations = await _examinationService.GetAll();
            var currentExaminations = examinations.Where(e => currentPatientsId.Contains(e.PatientId));
            return Ok(currentExaminations);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var currentUser = GetCurrentUser();
            var patients = await _patientService.GetAll();
            var currentPatientsId = patients.Where(p => p.DoctorId == currentUser.Id).Select(p => p.PatientId);
            var examination = await _examinationService.GetById(id);

            if (examination == null || !currentPatientsId.Contains(examination.PatientId))
            {
                return NotFound();
            }
            return Ok(examination);
        }

        [HttpGet("{patientId}/all")]
        public async Task<IActionResult> GetAllByPatientId(int patientId)
        {
            var currentUser = GetCurrentUser();
            var patients = await _patientService.GetAll();
            var currentPatientsId = patients.Where(p => p.DoctorId == currentUser.Id).Select(p => p.PatientId);
            var examinations = await _examinationService.GetAllByPatientId(patientId);
            if (examinations == null || !currentPatientsId.Contains(patientId))
            {
                return NotFound();
            }
            return Ok(examinations);
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ExaminationDto examinationDto)
        {
            var createdExamination = await _examinationService.Create(examinationDto.PatientId, examinationDto.Natrium, examinationDto.CurrentWeight, examinationDto.BodyTemperature, examinationDto.Vomit, examinationDto.Stool, examinationDto.Symptoms);
            return Ok(createdExamination);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] ExaminationDto examinationDto, [FromRoute] int id)
        {
            var currentUser = GetCurrentUser();
            var examination = await _examinationService.GetById(id);
            if (examination == null) return NotFound();
            var patient = await _patientService.GetById(examination.PatientId);
            if (patient != null && currentUser.Id != patient.DoctorId) return Unauthorized();
            var updatedExamination = await _examinationService.Update(id, examinationDto.Natrium, examinationDto.CurrentWeight, examinationDto.BodyTemperature
                , examinationDto.Vomit, examinationDto.Stool, examinationDto.Symptoms);
            if (!updatedExamination)
            {
                return NotFound();
            }
            return Ok(updatedExamination);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var currentUser = GetCurrentUser();
            var examination = await _examinationService.GetById(id);
            if (examination == null) return NotFound();
            var patient = await _patientService.GetById(examination.PatientId);
            if (patient != null && currentUser.Id != patient.DoctorId) return Unauthorized();

            var result = await _examinationService.Delete(id);
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
