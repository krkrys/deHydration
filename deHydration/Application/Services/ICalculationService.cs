using Domain.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface ICalculationService
    {
        public SymptomLevel CalculateDehydrationLevel(Examination examination);
        public Fluid CalculateFluidsNeeded(Patient? patient, Examination examination);
        public FluidDetailsNormal CalculateFluidDetailsNormal(Patient patient, Examination examination);
        public FluidDetailsSevere CalculateFluidDetailsSevere(Patient patient, Examination examination);
    }
}
