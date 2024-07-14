using Domain.Models;

namespace DehydrationApp.Dto
{
    public class PatientShowDto
    {
        public int PatientId { get; private set; }
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public string PhoneNumber { get; private set; }
        public int StandardWeight { get; private set; }

        public PatientShowDto(int patientId, string name, string surname, string phoneNumber, int standardWeight)
        {
            PatientId = patientId;
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
        }

        public static PatientShowDto Create(Patient patient)
        {
            return new PatientShowDto(
                patient.PatientId,
                patient.Name,
                patient.Surname,
                patient.PhoneNumber,
                patient.StandardWeight
                );
        }
    }
}
