using Persistence.Context;
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

        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            using var connection = _dapperContext.CreateConnection();
            return await connection.QueryAsync<Patient>("SELECT * FROM Patients");
        }

        public async Task<Patient?> GetByIdAsync(int id)
        {
            using var connection = _dapperContext.CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<Patient?>("SELECT * FROM Patients WHERE PatientId = @Id", new { Id = id });
        }
        
        public async Task<int> AddAsync(Patient entity)
        {
            var sql = "INSERT INTO Patients (Name, Surname, PhoneNumber, StandardWeight) " +
                      "VALUES (@Name, @Surname, @PhoneNumber, @StandardWeight); " +
                      "SELECT CAST(SCOPE_IDENTITY() AS int) ";
            using var connection = _dapperContext.CreateConnection();
            var id = await connection.QuerySingleAsync<int>(sql, entity);
            return id;
        }

        
        public async Task<bool> UpdateAsync(Patient entity)
        {
            var sql = "UPDATE Patients SET PhoneNumber=@PhoneNumber, StandardWeight=@StandardWeight WHERE PatientId = @PatientId";
            using var connection = _dapperContext.CreateConnection();
            var affectedRows = await connection.ExecuteAsync(sql, entity);
            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _dapperContext.CreateConnection();
            var affectedRows = await connection.ExecuteAsync("DELETE FROM Patients WHERE PatientId = @Id", new { Id = id });
            return affectedRows > 0;
        }
        
    }
}
