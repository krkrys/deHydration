using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Persistence.Repository
{
    public interface IExaminationRepository : IGenericRepository<Examination>
    {
        Task<IEnumerable<Examination>?> GetAllByPatientIdAsync(int id);
    }
}
