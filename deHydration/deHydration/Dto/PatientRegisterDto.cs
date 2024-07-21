using System.ComponentModel.DataAnnotations;

namespace DehydrationApp.Dto
{
    public class PatientRegisterDto
    {
        [Required]
        public string Name { get; private set; }
        [Required]
        public string Surname { get; private set; }
        [Required]
        //[Phone]
        public string PhoneNumber { get; private set; }
        [Required]
        public int StandardWeight { get; private set; }
        [Required]
        public int DoctorId { get; private set; }

        public PatientRegisterDto(string name, string surname, string phoneNumber, int standardWeight)
        {
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
            
        }
    }
}
