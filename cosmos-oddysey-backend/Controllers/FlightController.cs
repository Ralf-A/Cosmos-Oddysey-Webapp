using Microsoft.AspNetCore.Mvc;
using CosmosOdyssey.Models;
using CosmosOdyssey.Data;

namespace CosmosOdyssey.Controllers
// controller for the flight model, GET and POST methods
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly ApiContext _context;
        
        public FlightController(ApiContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public JsonResult GetFlights()
        {
            return new JsonResult(_context.Flights);
        }
        
        [HttpPost]
        public JsonResult PostFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            _context.SaveChanges();
            return new JsonResult(flight);
        }
    }
}