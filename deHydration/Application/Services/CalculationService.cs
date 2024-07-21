using System.Dynamic;
using System.Reflection;
using Domain.Models;

namespace Application.Services
{
    public class CalculationService : ICalculationService
    {
        public SymptomLevel CalculateDehydrationLevel(Examination examination)
        {
            int[] counts = new int[3]; // Index 0: Mild, 1: Moderate, 2: Severe

            foreach (PropertyInfo property in examination.Symptoms?.GetType().GetProperties()!)
            {
                var val = property.GetValue(examination.Symptoms)?.ToString();
                switch (val)
                {
                    case "Mild":
                        counts[0]++;
                        break;
                    case "Moderate":
                        counts[1]++;
                        break;
                    case "Severe":
                        counts[2]++;
                        break;
                }
            }

            var maxCount = counts.Max();
            if (maxCount == counts[2]) { return SymptomLevel.Severe; }
            if (maxCount == counts[1]) { return SymptomLevel.Moderate; }
            return SymptomLevel.Mild;
        }

        public Fluid CalculateFluidsNeeded(Patient patient, Examination examination)
        {
            var result = new Fluid();
            var standardWeight = patient.StandardWeight;
            var currentWeight = examination.CurrentWeight;
            var bodyTemperature = examination.BodyTemperature;
            const float normalTemperature = 36.6f;
            var vomit = examination.Vomit;
            var stool = examination.Stool;
            var fever = Math.Max(bodyTemperature - normalTemperature, 0);

            var lostFluid = Math.Max(standardWeight - currentWeight, 0) * 1000;
            result.LostFluid = lostFluid;

            var weightInterval1 = Math.Min(standardWeight, 10);
            var weightInterval2 = Math.Max(Math.Min(standardWeight, 20), 10) - 10;
            var weightInterval3 = Math.Max(standardWeight, 20) - 20;

            var standardFluidNeeded = weightInterval1 * 100 + weightInterval2 * 50 + weightInterval3 * 20;
            result.StandardFluidNeeded = standardFluidNeeded;

            var fluidNeeded = Math.Min((standardFluidNeeded + lostFluid + (stool * 10 + vomit * 5) * standardWeight) * (1 + 0.15 * fever), 3000.0);
            result.FluidNeeded = (int)Math.Round(fluidNeeded, 0);

            return result;
        }

        public FluidDetailsNormal CalculateFluidDetailsNormal(Patient patient, Examination examination)
        {
            var result = new FluidDetailsNormal(new FirstHour(), new NextFourHours(), new NextEightHours(), new NextTwelveHours());
            var standardWeight = patient.StandardWeight;
            var fluidsNeeded = CalculateFluidsNeeded(patient, examination);

            result.FirstHour.NaCl = 15 * standardWeight;
            result.FirstHour.NaHCO3 = 1 * standardWeight;

            if (patient.StandardWeight <= 10)
            {
                result.NextFourHours.Ringer = 50 * standardWeight * 4;
            }
            else
            {
                result.NextFourHours.Ringer = 20 * standardWeight * 4;
            }

            result.NextEightHours.glk = 70 * standardWeight;
            result.NextEightHours.NaCl = (int)Math.Round(1.5 * standardWeight, 0);
            result.NextEightHours.NaHCO3 = (int)Math.Round(1.5 * standardWeight, 0);
            result.NextEightHours.KCl = (int)Math.Round(0.5 * standardWeight, 0);

            result.NextTwelveHours.glk = 70 * standardWeight;
            result.NextTwelveHours.NaCl = (int)Math.Round(1.25 * standardWeight, 0);
            result.NextTwelveHours.KCl = (int)Math.Round(0.875 * standardWeight, 0);

            var fluidSum = 0;

            fluidSum += FluidSum(result.FirstHour) + FluidSum(result.NextFourHours) + FluidSum(result.NextEightHours) + FluidSum(result.NextTwelveHours);

            /*var sum= fluidHourInstance.GetType()
                .GetProperties()
                .Where(prop => prop.PropertyType == typeof(int))
                .Sum(prop => (int)prop.GetValue(fluidHourInstance));*/

            double compound = (double)fluidsNeeded.FluidNeeded / fluidSum;

            /*foreach (var propertyInfo in result.GetType().GetProperties())
            {
                foreach (var property in propertyInfo.GetType().GetProperties().Where(p => p.PropertyType == typeof(int)))
                {
                    Console.WriteLine("+" + property.Name + " " + property.GetValue(propertyInfo));
                    var value = (int)Math.Round((decimal)((int)property.GetValue(propertyInfo) * compound), 0);
                    property.SetValue(propertyInfo, value);
                    Console.WriteLine("+" + property.Name + " " + property.GetValue(propertyInfo));
                }
            }*/
            Compound(result.FirstHour, compound);
            Compound(result.NextFourHours, compound);
            Compound(result.NextEightHours, compound);
            Compound(result.NextTwelveHours, compound);

            return result;
        }

        public FluidDetailsSevere CalculateFluidDetailsSevere(Patient patient, Examination examination)
        {
            var result = new FluidDetailsSevere(new FirstHourSevere(), new SecondHourSevere(), new NextEightHoursSevere(), new NextSixteenHoursSevere());
            var standardWeight = patient.StandardWeight;
            var deficit = CalculateFluidsNeeded(patient, examination).LostFluid;
            var fluidsNeeded = CalculateFluidsNeeded(patient, examination);


            result.FirstHour.Albumins = 20 * standardWeight;

            if (patient.StandardWeight <= 10)
            {
                result.SecondHour.Ringer = 20 * standardWeight;
            }
            else { result.SecondHour.Ringer = 10 * standardWeight; }

            result.NextEightHours.TotalFluid = (int)Math.Round(0.3 * fluidsNeeded.StandardFluidNeeded, 0);
            result.NextEightHours.WaterDeficit = (int)Math.Round(0.5 * deficit, 0);

            result.NextSixteenHours.TotalFluid = (int)Math.Round(0.6 * fluidsNeeded.StandardFluidNeeded, 0);
            result.NextSixteenHours.WaterDeficit = (int)Math.Round(0.5 * deficit, 0);

            var fluidSum = 0;

            fluidSum += FluidSum(result.FirstHour) + FluidSum(result.SecondHour) + FluidSum(result.NextEightHours) + FluidSum(result.NextSixteenHours);

            double compound = (double)fluidsNeeded.FluidNeeded / fluidSum;

            Compound(result.FirstHour, compound);
            Compound(result.SecondHour, compound);
            Compound(result.NextEightHours, compound);
            Compound(result.NextSixteenHours, compound);

            return result;
        }

        public static void Compound(object obj, double compound)
        {
            foreach (PropertyInfo property in obj.GetType().GetProperties().Where(prop => prop.PropertyType == typeof(int)))
            {
                var value = (int)Math.Round((int)property.GetValue(obj) * compound, 0);
                property.SetValue(obj, value);
            }
        }

        public static int FluidSum(object obj)
        {
            var result = obj.GetType()
                .GetProperties()
                .Where(prop => prop.PropertyType == typeof(int))
                .Sum(prop => (int)prop.GetValue(obj));
            return result;
        }

    }
}
