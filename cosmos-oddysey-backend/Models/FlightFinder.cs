using CosmosOdyssey.Models;

public class FlightFinder
// Class to find all possible paths between two planets
// Uses a depth-first search algorithm to find all possible paths
{
    private readonly Dictionary<string, List<Flight>> _flightsFromOrigin;
    
    public FlightFinder(IEnumerable<Flight> flights)
    {
        _flightsFromOrigin = flights
            .GroupBy(fl => fl.Origin)
            .ToDictionary(group => group.Key!, group => group.ToList());
    }


    public List<List<Flight>> FindAllPaths(string start, string end)
    {
        var paths = new List<List<Flight>>();
        var visited = new HashSet<string>();
        DepthFirstSearch(start, end, visited, new List<Flight>(), paths, null);
        return paths;
    }

    private void DepthFirstSearch(string current, string end, HashSet<string> visited, List<Flight> currentPath, List<List<Flight>> paths, DateTime? lastArrivalTime)
    {
        if (current == end)
        {
            paths.Add(new List<Flight>(currentPath));
            return;
        }

        if (visited.Contains(current))
        {
            return;
        }

        visited.Add(current);
        
        if (_flightsFromOrigin.TryGetValue(current, out var flights))
        {
            foreach (var flight in flights)
            {
                if (lastArrivalTime == null || flight.DepartureTime > lastArrivalTime.Value.AddMinutes(15)) 
                {
                    currentPath.Add(flight);
                    DepthFirstSearch(flight.Destination, end, visited, currentPath, paths, flight.ArrivalTime);
                    currentPath.RemoveAt(currentPath.Count - 1);
                }
            }
        }

        visited.Remove(current);
    }
}