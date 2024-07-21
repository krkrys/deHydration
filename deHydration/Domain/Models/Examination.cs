using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Examination
    {
        public int ExaminationId { get; }
        public int PatientId { get; private set;}
        public int Natrium { get; private set;}
        public int CurrentWeight { get; private set; }
        public float BodyTemperature { get; private set; }
        public int Vomit { get; private set; }
        public int Stool { get; private set; }
        public Symptoms? Symptoms { get;  set; }

        public Examination() { }
        public Examination(int examinationId, int patientId, int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms)
        {
            ExaminationId = examinationId;
            PatientId = patientId;
            Natrium = natrium;
            CurrentWeight = currentWeight;
            BodyTemperature = bodyTemperature;
            Vomit = vomit;
            Stool = stool;
            Symptoms = symptoms;
        }

        public static Examination Create(int patientId, int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms)
        {
            return new Examination(0, patientId, natrium, currentWeight, bodyTemperature, vomit, stool, symptoms);
        }

        public static Examination Update(int examinationId,int natrium, int currentWeight, float bodyTemperature, int vomit, int stool, Symptoms symptoms)
        {
            return new Examination(examinationId, 0, natrium, currentWeight, bodyTemperature, vomit, stool, symptoms);
        }
    }
}
