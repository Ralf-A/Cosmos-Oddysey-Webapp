using CosmosOdyssey.Service;
using CosmosOdyssey.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container, starts the application
builder.Services.AddHostedService<UpdateService>();
builder.Services.AddHttpClient();
builder.Services.AddDbContext<ApiContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("CosmosOddyseyDatabase")));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed((host) => true)
            .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply database migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApiContext>();

    // Ensure the database is created
    dbContext.Database.EnsureCreated();

    // Clear existing data
    ClearExistingData(dbContext);

}

// Method to clear existing data
static void ClearExistingData(ApiContext dbContext)
{
    var existingFlights = dbContext.Flights.ToList();
    dbContext.Flights.RemoveRange(existingFlights);

    var existingTravels = dbContext.Travels.ToList();
    dbContext.Travels.RemoveRange(existingTravels);

    var existingReservations = dbContext.Reservations.ToList();
    dbContext.Reservations.RemoveRange(existingReservations);

    dbContext.SaveChanges();
}



app.UseCors("CorsPolicy");

app.UseSwagger();
app.UseSwaggerUI();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "cosmos-oddysey-backend");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
