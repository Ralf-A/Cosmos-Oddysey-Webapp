using Microsoft.AspNetCore.Mvc;
using CosmosOdyssey.Data;
using Microsoft.EntityFrameworkCore;

namespace CosmosOdyssey.Controllers

// Controller for flight finder model, GET method
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightFinderController : ControllerBase
    {
        private readonly ApiContext _context;
        
        public FlightFinderController(ApiContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public JsonResult GetPaths(string startLoc, string endLoc)
        {
            // Only consider flights which are part of the current pricelist
            var flights = _context.Flights.Where(fl => fl.isValid == 0).ToListAsync().Result;
            
            FlightFinder finder = new FlightFinder(flights);
            var paths = finder.FindAllPaths(startLoc, endLoc);
            
            return new JsonResult(paths);
        }
    }
}