using CosmosOdyssey.Models;
using Microsoft.EntityFrameworkCore;

namespace CosmosOdyssey.Data;

public class ApiContext : DbContext
// Database context for the API
{
    public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }
    public DbSet<Flight> Flights { get; set; }
    public DbSet<Travel> Travels { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=db;Port=5432;Database=CosmosOddyseyDatabase;Username=postgres;Password=sql");
    }

}