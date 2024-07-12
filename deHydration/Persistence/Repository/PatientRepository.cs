using Persistence.Context;
using System.Data;
using Dapper;
using Domain.Models;

namespace Persistence.Repository
{
    public class PatientRepository : IPatientRepository
    {
        private readonly IDapperContext _dapperContext;

        public PatientRepository(IDapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<Patient> GetByIdAsync(int id)
        {
            using var connection = _dapperContext.CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<Patient>("SELECT * FROM Patients WHERE Id = @Id", new { Id = id });

        }
        /*
        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            using var connection = _dapperContext.CreateConnection();
            return await connection.QueryAsync<Patient>("SELECT * FROM Patients");
        }
        */

        public async Task<int> AddAsync(Patient entity)
        {
            var sql = "INSERT INTO Patients (Name, Surname, PhoneNumber, StandardWeight) " +
                      "VALUES (@Name, @Surname, @PhoneNumber, @StandardWeight); " +
                      "SELECT CAST(SCOPE_IDENTITY() AS int) ";
            using var connection = _dapperContext.CreateConnection();
            var id = await connection.QuerySingleAsync<int>(sql, entity);
            return id;
        }

        /*
        public bool Update(Patient model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
        */
    }
}
