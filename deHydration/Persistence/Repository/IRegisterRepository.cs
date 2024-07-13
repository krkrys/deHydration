
using Domain.Models;

namespace Persistence.Repository
{
    public interface IRegisterRepository : IGenericRepository<User>
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);

        Task<int> AddAsync(User entity);
        Task<bool> UpdateAsync(User entity);
        Task<bool> DeleteAsync(int id);
    }
}
