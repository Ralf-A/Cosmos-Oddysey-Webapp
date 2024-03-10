using Microsoft.AspNetCore.Mvc;
using CosmosOdyssey.Models;
using CosmosOdyssey.Data;

namespace CosmosOdyssey.Controllers
// Controller for a travel reservation model, GET and POST methods
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private readonly ApiContext _context;
        
        public TravelController(ApiContext context)
        {
            _context = context;
        }

        // GET all travel reservations
        [HttpGet]
        public JsonResult GetTravels()
        {
            return new JsonResult(_context.Travels);
        }

        // POST a new travel reservation to the database
        [HttpPost]
        public JsonResult PostTravel(Travel travel)
        {
            _context.Travels.Add(travel);
            _context.SaveChanges();
            return new JsonResult(travel);
        }
    }
}