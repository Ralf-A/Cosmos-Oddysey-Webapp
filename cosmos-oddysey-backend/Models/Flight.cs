using System;
using System.ComponentModel.DataAnnotations;

namespace CosmosOdyssey.Models
// Model for the flight object
// consists of a flight ID, company name, origin, destination, price, distance, departure time, arrival time, and isValid to see if the flight is valid
{
    public class Flight
    {
        [Key] 
        public string? FlightID { get; set; } 
        public string? CompanyName { get; set; }
        public string? Origin { get; set; }
        public string? Destination { get; set; }
        public decimal Price { get; set; }
        public long Distance { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime ValidUntil { get; set; }
        public int isValid { get; set; }
    }
}