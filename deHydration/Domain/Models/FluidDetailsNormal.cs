namespace Domain.Models
{
    public class FirstHour
    {
        public int NaCl { get; set; }
        public int NaHCO3 { get; set; }
    }

    public class NextFourHours
    {
        public int Ringer { get; set; }
    }
    public class NextEightHours
    {
        public int glk { get; set; }
        public int NaCl { get; set; }
        public int NaHCO3 { get; set; }
        public int KCl { get; set; }
    }

    public class NextTwelveHours
    {
        public int glk { get; set; }
        public int NaCl { get; set; }
        public int KCl { get; set; }
    }

    public class FluidDetailsNormal(
        FirstHour firstHour,
        NextFourHours nextFourHours,
        NextEightHours nextEightHours,
        NextTwelveHours nextTwelveHours)
    {
        public FirstHour FirstHour { get; set; } = firstHour;
        public NextFourHours NextFourHours { get; set; } = nextFourHours;
        public NextEightHours NextEightHours { get; set; } = nextEightHours;
        public NextTwelveHours NextTwelveHours { get; set; } = nextTwelveHours;
    }
}
