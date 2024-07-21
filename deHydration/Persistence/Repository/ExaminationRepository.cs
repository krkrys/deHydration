using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Domain.Models;
using Persistence.Context;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Persistence.Repository
{
    public class ExaminationRepository : IExaminationRepository
    {
        private readonly IDapperContext _dapperContext;

        public ExaminationRepository(IDapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<IEnumerable<Examination>> GetAllAsync()
        {
            using var connection = _dapperContext.CreateConnection();
            var sql = "SELECT e.*, s.* FROM Examinations e join Symptoms s on e.ExaminationId= s.ExaminationId";
            var result = await connection.QueryAsync<Examination, Symptoms, Examination>
            (sql, map: (e, s) => { e.Symptoms = s; return e; }, splitOn: "GeneralAppearance");
            return result;
        }

        public async Task<Examination?> GetByIdAsync(int id)
        {
            using var connection = _dapperContext.CreateConnection();
            var sql = "SELECT e.*, s.* FROM Examinations e join Symptoms s on e.ExaminationId= s.ExaminationId WHERE e.ExaminationId = @Id and s.ExaminationId= @Id";
            var result = await connection.QueryAsync<Examination, Symptoms, Examination>
            (sql, map: (e, s) => { e.Symptoms = s; return e; }, splitOn: "GeneralAppearance",
            param: new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Examination>?> GetAllByPatientIdAsync(int id)
        {
            using var connection = _dapperContext.CreateConnection();
            var sql =
                "SELECT e.*, s.* FROM Examinations e join Symptoms s on e.ExaminationId= s.ExaminationId WHERE e.PatientId = @Id";
            var result = await connection.QueryAsync<Examination, Symptoms, Examination>
            (sql, map: (e, s) => { e.Symptoms = s; return e; }, splitOn: "GeneralAppearance",
                param: new { Id = id });
            return result;
        }
        public async Task<int> AddAsync(Examination entity)
        {
            var par = new DynamicParameters();
            par.Add("@ExaminationId", entity.ExaminationId);
            par.Add("@PatientId", entity.PatientId);
            par.Add("@Natrium", entity.Natrium);
            par.Add("@CurrentWeight", entity.CurrentWeight);
            par.Add("@BodyTemperature", entity.BodyTemperature);
            par.Add("@Vomit", entity.Vomit);
            par.Add("@Stool", entity.Stool);
            par.Add("@GeneralAppearance", entity.Symptoms.GeneralAppearance);
            par.Add("@RadialPulse", entity.Symptoms.RadialPulse);
            par.Add("@Respirations", entity.Symptoms.Respirations);
            par.Add("@AnteriorFontanelle", entity.Symptoms.AnteriorFontanelle);
            par.Add("@SystolicBloodPressure", entity.Symptoms.SystolicBloodPressure);
            par.Add("@SkinElasticity", entity.Symptoms.SkinElasticity);
            par.Add("@Eyes", entity.Symptoms.Eyes);
            par.Add("@Tears", entity.Symptoms.Tears);
            par.Add("@MucousMembranes", entity.Symptoms.MucousMembranes);

            var sql = @"DECLARE @ExamId int
INSERT INTO Examinations VALUES (@PatientId, @Natrium, @CurrentWeight, @BodyTemperature, @Vomit, @Stool);
SET @ExamId = CAST(SCOPE_IDENTITY() AS int)
INSERT INTO symptoms VALUES (@ExamId, @GeneralAppearance, @RadialPulse, @Respirations, @AnteriorFontanelle, @SystolicBloodPressure, @SkinElasticity, @Eyes, @Tears, @MucousMembranes);
SELECT @ExamId;";
            using var connection = _dapperContext.CreateConnection();
            var id = await connection.QuerySingleAsync<int>(sql, par);
            return id;
        }

        public async Task<bool> UpdateAsync(Examination entity)
        {
            var par = new DynamicParameters();
            par.Add("@ExaminationId", entity.ExaminationId);
            par.Add("@Natrium", entity.Natrium);
            par.Add("@CurrentWeight", entity.CurrentWeight);
            par.Add("@BodyTemperature", entity.BodyTemperature);
            par.Add("@Vomit", entity.Vomit);
            par.Add("@Stool", entity.Stool);
            par.Add("@GeneralAppearance", entity.Symptoms.GeneralAppearance);
            par.Add("@RadialPulse", entity.Symptoms.RadialPulse);
            par.Add("@Respirations", entity.Symptoms.Respirations);
            par.Add("@AnteriorFontanelle", entity.Symptoms.AnteriorFontanelle);
            par.Add("@SystolicBloodPressure", entity.Symptoms.SystolicBloodPressure);
            par.Add("@SkinElasticity", entity.Symptoms.SkinElasticity);
            par.Add("@Eyes", entity.Symptoms.Eyes);
            par.Add("@Tears", entity.Symptoms.Tears);
            par.Add("@MucousMembranes", entity.Symptoms.MucousMembranes);

            var sql = """
                      UPDATE Examinations SET Natrium=@Natrium, CurrentWeight=@CurrentWeight, BodyTemperature=@BodyTemperature, Vomit=@Vomit, Stool=@Stool
                      WHERE ExaminationId=@ExaminationId;
                      UPDATE Symptoms SET GeneralAppearance=@GeneralAppearance, RadialPulse=@RadialPulse, Respirations=@Respirations, AnteriorFontanelle=@AnteriorFontanelle
                      , SystolicBloodPressure=@SystolicBloodPressure, SkinElasticity=@SkinElasticity, Eyes=@Eyes, Tears=@Tears, MucousMembranes=@MucousMembranes WHERE ExaminationId=@ExaminationId;
                      """;

            using var connection = _dapperContext.CreateConnection();
            var affectedRows = await connection.ExecuteAsync(sql, par);
            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sql = @"DELETE FROM Symptoms WHERE ExaminationId = @Id
DELETE FROM Examinations WHERE ExaminationId = @Id;";
            using var connection = _dapperContext.CreateConnection();
            var affectedRows = await connection.ExecuteAsync(sql, new { Id = id });
            return affectedRows > 0;
        }
    }
}
