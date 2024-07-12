using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class PatientDto
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

        public PatientDto(string name, string surname, string phoneNumber, int standardWeight)
        {
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
        }
    }
}
