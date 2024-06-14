namespace TrainRouteApp
{
    public class TrainRoute
    {
        public string Start { get; set; }
        public string End { get; set; }
        public double Cost { get; set; }
        public double DistanceInKm { get; set; }

        public TrainRoute(string start, string end, double cost, double distanceInKm)
        {
            Start = start;
            End = end;
            Cost = cost;
            DistanceInKm = distanceInKm;
        }
    }
}
