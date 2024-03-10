using System.ComponentModel.DataAnnotations;

namespace CosmosOdyssey.Models;
public class Travel
// Model for a travel reservation
// Consists of a travel ID, passenger first and last name, distance, duration, price, and isValid to see if the travel is valid
{
    [Key] public string? TravelID { get; set; } 
    public string? PassengerFirstName { get; set; }  
    public string? PassengerLastName { get; set; }   
    public long Distance { get; set; }              
    public long Duration { get; set; }              
    public decimal Price { get; set; }              
    public int isValid { get; set; }        
}