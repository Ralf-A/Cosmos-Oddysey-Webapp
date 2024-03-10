using System.ComponentModel.DataAnnotations;

namespace CosmosOdyssey.Models;
public class Reservation
// Model for a travel reservation
// Consists of a travel ID, passenger first and last name, distance, duration, price, and isValid to see if the reservation is valid

{
    [Key] public string? ReservationID { get; set; }
    public string? TravelID { get; set; }
    public string? FlightID { get; set; }
    public int isValid { get; set; }
}