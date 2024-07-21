namespace Domain.Models
{
    public class FirstHourSevere
    {
        public int Albumins { get; set; }
    }

    public class SecondHourSevere
    {
        public int Ringer { get; set; }
    }
    public class NextEightHoursSevere
    {
        public int TotalFluid { get; set; }
        public int WaterDeficit { get; set; }
    }

    public class NextSixteenHoursSevere
    {
        public int TotalFluid { get; set; }
        public int WaterDeficit { get; set; }
    }

    public class FluidDetailsSevere(
        FirstHourSevere firstHour,
        SecondHourSevere secondHour,
        NextEightHoursSevere nextEightHours,
        NextSixteenHoursSevere nextSixteenHours)
    {
        public FirstHourSevere FirstHour { get; set; } = firstHour;
        public SecondHourSevere SecondHour { get; set; } = secondHour;
        public NextEightHoursSevere NextEightHours { get; set; } = nextEightHours;
        public NextSixteenHoursSevere NextSixteenHours { get; set; } = nextSixteenHours;
    }
}
