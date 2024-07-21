using Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace DehydrationApp.Dto
{
    public class ExaminationDto
    {
        [Required]
        public int PatientId { get; private set; }
        [Required] 
        public int Natrium { get; private set; }
        [Required] 
        public int CurrentWeight { get; private set; }
        [Required] 
        public float BodyTemperature { get; private set; }
        [Required] 
        public int Vomit { get; private set; }
        [Required] 
        public int Stool { get; private set; }
        [Required] 
        public Symptoms Symptoms { get; private set; }

        public ExaminationDto(int patientId, int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms)
        {
            PatientId = patientId;
            Natrium = natrium;
            CurrentWeight = currentWeight;
            BodyTemperature = bodyTemperature;
            Vomit = vomit;
            Stool = stool;
            Symptoms = symptoms;
        }
    }
}
