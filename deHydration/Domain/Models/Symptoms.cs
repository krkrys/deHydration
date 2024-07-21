namespace Domain.Models
{
    public class Symptoms
    {
        public SymptomLevel GeneralAppearance { get; private set; }
        public SymptomLevel RadialPulse { get; private set; }
        public SymptomLevel Respirations { get; private set; }
        public SymptomLevel AnteriorFontanelle { get; private set; }
        public SymptomLevel SystolicBloodPressure { get; private set; }
        public SymptomLevel SkinElasticity { get; private set; }
        public SymptomLevel Eyes { get; private set; }
        public SymptomLevel Tears { get; private set; }
        public SymptomLevel MucousMembranes { get; private set; }

        public Symptoms(SymptomLevel generalAppearance, SymptomLevel radialPulse,
            SymptomLevel respirations, SymptomLevel anteriorFontanelle, SymptomLevel systolicBloodPressure,
            SymptomLevel skinElasticity, SymptomLevel eyes, SymptomLevel tears, SymptomLevel mucousMembranes)
        {
            GeneralAppearance = generalAppearance;
            RadialPulse = radialPulse;
            Respirations = respirations;
            AnteriorFontanelle = anteriorFontanelle;
            SystolicBloodPressure = systolicBloodPressure;
            SkinElasticity = skinElasticity;
            Eyes = eyes;
            Tears = tears;
            MucousMembranes = mucousMembranes;
        }
    }
}
