using Microsoft.AspNetCore.Mvc;
using CosmosOdyssey.Models;
using CosmosOdyssey.Data;

namespace CosmosOdyssey.Controllers
// Controller for reservation model, GET and POST methods
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApiContext _context;

        public ReservationController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult GetReservations(string reservationId)
        {
            return new JsonResult(_context.Reservations.Where(rs => rs.ReservationID == reservationId));
        }

        [HttpPost]
        public JsonResult PostReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            _context.SaveChanges();
            return new JsonResult(reservation);
        }  
    }
}