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
        public int DoctorId { get; private set; }

        public Patient(int patientId, string name, string surname, string phoneNumber, int standardWeight, int doctorId)
        {
            PatientId = patientId;
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
            StandardWeight = standardWeight;
            DoctorId = doctorId;
        }

        public static Patient Create(string name, string surname, string phoneNumber, int standardWeight, int doctorId)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(surname) || !Regex.Match(phoneNumber, @"^([0-9]{9})$").Success || standardWeight<=0)
            {
                throw new ValidationException();
            }

            return new Patient(0, name, surname, phoneNumber, standardWeight, doctorId);
        }

        public static Patient Update(int patientId, string phoneNumber, int standardWeight)
        {
            if (!Regex.Match(phoneNumber, @"^([0-9]{9})$").Success || standardWeight <= 0)
            {
                throw new ValidationException();
            }

            return new Patient(patientId, "", "", phoneNumber, standardWeight,0);
        }
    }
}
