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

        public async Task<IEnumerable<Patient>> GetAll()
        {
            try
            {
                var patients = await _repository.GetAllAsync();

                return patients;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Patient?> GetById(int id)
        {
            try
            {
                var patient = await _repository.GetByIdAsync(id);

                return patient;
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
                throw ex;
            }
        }

        public async Task<bool> Update(int id, string phoneNumber, int standardWeight)
        {

            try
            {
                var updatedPatient = Patient.Update(id, phoneNumber, standardWeight);
                var result = await _repository.UpdateAsync(updatedPatient);

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteById(int id)
        {
            try
            {
                var result = await _repository.DeleteAsync(id);

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
