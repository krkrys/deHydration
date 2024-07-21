using Domain.Models;
using Persistence.Context;
using Dapper;

namespace Persistence.Repository
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly IDapperContext _context;

        public RegisterRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<User>("SELECT * FROM Users");
            }
        }

        public async Task<int> AddAsync(User entity)
        {
            var sql = "";
            if (_context is DapperContext)
            {
                sql = "INSERT INTO Users (Name, Email, Password) VALUES (@Name, @Email, @Password); SELECT CAST(SCOPE_IDENTITY() as int)";
            }
            else
            {
                sql = "INSERT INTO Users (Name, Email, Password) VALUES (@Name, @Email, @Password); SELECT CAST(last_insert_rowid() as int)";
            }
            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(sql, entity);
                return id;
            }
        }

        public async Task<User> GetByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>("SELECT * FROM Users WHERE Id = @Id", new { Id = id });
            }
        }

        public async Task<bool> UpdateAsync(User entity)
        {
            var sql = "UPDATE Users SET Name = @Name, Email = @Email, Password = @Password WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync(sql, entity);
                return affectedRows > 0;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync("DELETE FROM Users WHERE Id = @Id", new { Id = id });
                return affectedRows > 0;
            }
        }
    }
}
