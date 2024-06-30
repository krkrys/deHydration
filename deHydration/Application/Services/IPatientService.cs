using Domain.Models;

namespace Application.Services;

public interface IPatientService
{
    Task<Patient?> Create(string name, string surname, string phoneNumber, int standardWeight);
}