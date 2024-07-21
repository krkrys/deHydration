using Application.Services;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DehydrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationsController : ControllerBase
    {
        private readonly ICalculationService _calculationService;
        private readonly IPatientService _patientService;
        private readonly IExaminationService _examinationService;

        public CalculationsController(ICalculationService calculationService, IPatientService patientService, IExaminationService examinationService)
        {
            _calculationService = calculationService;
            _patientService = patientService;
            _examinationService = examinationService;
        }

        [HttpGet("/level/{id}")]
        public async Task<IActionResult> GetDehydrationLevel(int id)
        {
            var examination = await _examinationService.GetById(id);
            if (examination != null)
            {
                var result = _calculationService.CalculateDehydrationLevel(examination);
                return Ok(result.ToString());
            }

            return NotFound();
        }

        [HttpGet("/fluid/{id}")]
        public async Task<IActionResult> GetFluidNeeded(int id)
        {
            var examination = await _examinationService.GetById(id);
            if (examination != null)
            {
                var patient = await _patientService.GetById(examination.PatientId);
                var result = _calculationService.CalculateFluidsNeeded(patient, examination);
                return Ok(result);
            }

            return NotFound();
        }
        [HttpGet("/details/{id}")]
        public async Task<IActionResult> GetFluidDetails(int id)
        {
            var examination = await _examinationService.GetById(id);
            object? result;
            if (examination != null)
            {
                var patient = await _patientService.GetById(examination.PatientId);
                var dehydrationLevel = _calculationService.CalculateDehydrationLevel(examination);
                if (dehydrationLevel != SymptomLevel.Severe)
                {
                    result = _calculationService.CalculateFluidDetailsNormal(patient, examination);
                }
                else { result = _calculationService.CalculateFluidDetailsSevere(patient, examination); }

                return Ok(result);
            }

            return NotFound();
        }
    }
}