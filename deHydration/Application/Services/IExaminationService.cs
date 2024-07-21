using Domain.Models;

namespace Application.Services
{
    public interface IExaminationService
    {
        Task<IEnumerable<Examination>?> GetAll();
        Task<Examination?> GetById(int id);
        Task<IEnumerable<Examination>?> GetAllByPatientId(int id);
        Task<Examination?> Create(int patientId, int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms);
        Task<bool> Update(int examinationId, int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms);
        Task<bool> Delete(int id);
    }
}
