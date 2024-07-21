using System.ComponentModel.DataAnnotations;

namespace DehydrationApp.Dto
{
    public class PatientUpdateDto
    {
        //[Phone]
        public string PhoneNumber { get; private set; }
        [Required]
        public int StandardWeight { get; private set; }

        public PatientUpdateDto(string phoneNumber, int standardWeight)
        {
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
        }
    }
}
