using Domain.Models;
using Persistence.Repository;

namespace Application.Services
{
    public class PatientService : IPatientService
    {

        private readonly IPatientRepository _repository;
        public PatientService(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Patient?> Create(string name, string surname, string phoneNumber, int standardWeight)
        {

            try
            {
                var newPatient = Patient.Create(name, surname, phoneNumber, standardWeight);
                var id = await _repository.AddAsync(newPatient);

                var patient = await _repository.GetByIdAsync(id);

                return patient;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
