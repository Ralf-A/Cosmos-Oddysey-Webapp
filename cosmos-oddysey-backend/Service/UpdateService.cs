using System.Text.Json;
using CosmosOdyssey.Models;
using CosmosOdyssey.Data;

namespace CosmosOdyssey.Service;

public class UpdateService : BackgroundService{

// This class fetches new data from the flights API and updates the database with it

    // classes to deserialize the JSON response from the flights API
    private class Location
    {
        public string? id { get; set; }
        public string? name { get; set; }
    }
    
    private class RouteInfo
    {
        public string? id { get; set; }
        public Location? from { get; set; }
        public Location? to { get; set; }
        public long distance { get; set; }
    }

    private class Company
    {
        public string? id { get; set; }
        public string? name { get; set; }
    }

    private class ProvidedFlight
    {
        public string? id { get; set; }
        public Company? company { get; set; }
        public decimal price { get; set; }
        public DateTime flightStart { get; set; }
        public DateTime flightEnd { get; set; }
    }
    
    private class Route
    {
        public string? id { get; set; }
        public RouteInfo? routeInfo { get; set; }
        public List<ProvidedFlight>? providers { get; set; }
    }
    
    private class Json
    {
        public string? id { get; set; }
        public DateTime validUntil { get; set; }
        public List<Route>? legs { get; set; }
    }
    
    
    private readonly ILogger<UpdateService> _logger;
    private readonly IHttpClientFactory _clientFactory;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public UpdateService(ILogger<UpdateService> logger, IHttpClientFactory clientFactory, IServiceScopeFactory serviceScopeFactory)
    {
        _logger = logger;
        _clientFactory = clientFactory;
        _serviceScopeFactory = serviceScopeFactory;
    }

    private string _lastProcessedId = null;                         
    private DateTime _lastProcessedValidUntil = DateTime.MinValue;  

    // Store the last processed data from the flights API
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApiContext>();
                
                // Only fetch new data if previous data is no longer valid
                if (DateTime.UtcNow > _lastProcessedValidUntil)
                { 
                    var request = new HttpRequestMessage(HttpMethod.Get, "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices");
                    request.Headers.Add("Accept", "application/json");
                    request.Headers.Add("User-Agent", "CosmosOdyssey");

                    var client = _clientFactory.CreateClient();

                    var response = await client.SendAsync(request);

                    if (response.IsSuccessStatusCode)
                    {
                        var json = await response.Content.ReadAsStringAsync();
                        var deserializedJson = JsonSerializer.Deserialize<Json>(json);

                        if (deserializedJson.id != _lastProcessedId)
                        {
                            _lastProcessedId = deserializedJson.id;
                            _lastProcessedValidUntil = deserializedJson.validUntil;
                            
                            foreach (var flight in _context.Flights)
                            {
                                flight.isValid++;
                            }
                            
                            foreach (var reservation in _context.Reservations)
                            {
                                reservation.isValid++;
                            }
                            
                            foreach (var travel in _context.Travels)
                            {
                                travel.isValid++;
                            }
                            // Removing old flights, travels and reservations from the database (validity of 15 new data cycles)
                            _logger.LogInformation("Removing {count} old flights", _context.Flights.Count(fl => fl.isValid >= 15));
                            _context.Flights.RemoveRange(_context.Flights.Where(fl => fl.isValid >= 15));
                            
                            _logger.LogInformation("Removing {count} old travels", _context.Reservations.Count(rs => rs.isValid >= 15));
                            _context.Reservations.RemoveRange(_context.Reservations.Where(rs => rs.isValid >= 15));
                            
                            _logger.LogInformation("Removing {count} old reservations", _context.Travels.Count(tr => tr.isValid >= 15));
                            _context.Travels.RemoveRange(_context.Travels.Where(tr => tr.isValid >= 15));
                            
                            // Add new flights to the database
                            foreach (var route in deserializedJson.legs)
                            {
                                foreach (var flight in route.providers)
                                {
                                    var newFlight = new Flight
                                    {
                                        FlightID = flight.id,
                                        CompanyName = flight.company.name,
                                        Origin = route.routeInfo.from.name,
                                        Destination = route.routeInfo.to.name,
                                        Distance = route.routeInfo.distance,
                                        Price = flight.price,
                                        DepartureTime = flight.flightStart,
                                        ArrivalTime = flight.flightEnd,
                                        ValidUntil = deserializedJson.validUntil,
                                        isValid = 0
                                    };
                                    
                                    _context.Flights.Add(newFlight);
                                }
                            }
                            await _context.SaveChangesAsync();
                            _logger.LogInformation("Added {count} new flights with a validUntil of {validUntil} UTC", _context.Flights.Count(fl => fl.isValid == 0), deserializedJson.validUntil.ToString("yyyy-MM-dd HH:mm:ss"));
                        }
                    }
                    
                    else
                    {
                        _logger.LogError("Error fetching flights from flights API, status code {statusCode}", response.StatusCode);
                    }
                    
                    await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                }
            }
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}