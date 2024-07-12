using Domain.Models;

namespace Application.Services;

public interface IPatientService
{
    Task<IEnumerable<Patient>> GetAll();
    Task<Patient?> GetById(int id);
    Task<Patient?> Create(string name, string surname, string phoneNumber, int standardWeight);
    Task<bool> Update(int id, string phoneNumber, int standardWeight);
    Task<bool> DeleteById(int id);
}