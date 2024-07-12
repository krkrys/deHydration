using System.Collections.Generic;
using Domain.Models;

namespace Persistence.Repository;

public interface IPatientRepository : IGenericRepository<Patient>
{
    //Task<IEnumerable<Patient>> GetAllAsync();
    Task<Patient?> GetByIdAsync(int id);

    Task<int> AddAsync(Patient entity);
    //Task<bool> UpdateAsync(Patient entity);
    //Task<bool> DeleteAsync(int id);

}