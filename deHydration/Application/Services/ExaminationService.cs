using Domain.Models;
using Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ExaminationService : IExaminationService
    {
        private readonly IExaminationRepository _repository;

        public ExaminationService(IExaminationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Examination>?> GetAll()
        {
            try
            {
                var examinations = await _repository.GetAllAsync();

                return examinations;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Examination?> GetById(int id)
        {
            try
            {
                var examination = await _repository.GetByIdAsync(id);

                return examination;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Examination>?> GetAllByPatientId(int id)
        {
            try
            {
                var examination = await _repository.GetAllByPatientIdAsync(id);

                return examination;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Examination?> Create(int patientId, int natrium, int currentWeight, float bodyTemperature,
            int vomit, int stool, Symptoms symptoms)
        {

            try
            {
                var newExamination = Examination.Create(patientId, natrium, currentWeight, bodyTemperature, vomit,
                    stool, symptoms);
                var id = await _repository.AddAsync(newExamination);

                var examination = await _repository.GetByIdAsync(id);

                return examination;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(int examinationId, int natrium, int currentWeight, float bodyTemperature,
            int vomit, int stool, Symptoms symptoms)
        {

            try
            {
                var newExamination = Examination.Update(examinationId, natrium, currentWeight, bodyTemperature, vomit,
                    stool, symptoms);
                var result = await _repository.UpdateAsync(newExamination);

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(int id)
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
