using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.Models
{
    public class Patient
    {
        
        public int PatientId { get; }
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public string PhoneNumber { get; private set; }
        public int StandardWeight { get; private set; }

        public Patient(int patientId, string name, string surname, string phoneNumber, int standardWeight)
        {
            PatientId = patientId;
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
        }

        public static Patient Create(string name, string surname, string phoneNumber, int standardWeight)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(surname) || !Regex.Match(phoneNumber, @"^([0-9]{9})$").Success || standardWeight<=0)
            {
                throw new ValidationException();
            }

            return new Patient(0, name, surname, phoneNumber, standardWeight);
        }

        public static Patient Update(int patientId, string phoneNumber, int standardWeight)
        {
            if (!Regex.Match(phoneNumber, @"^([0-9]{9})$").Success || standardWeight <= 0)
            {
                throw new ValidationException();
            }

            return new Patient(patientId, "a", "a", phoneNumber, standardWeight);
        }
    }
}
