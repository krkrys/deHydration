using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
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
