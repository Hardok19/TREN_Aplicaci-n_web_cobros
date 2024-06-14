using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using compras;

namespace MyApi.Controllers
{
    [Route("api/Tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private static string user = "";

        [HttpPost]
        public IActionResult Tickets([FromBody] TicketData ticket)
        {
            var compra = new List<string>();
            compra.Add(ticket.Start);
            compra.Add(ticket.End);
            compra.Add(ticket.Date);
            Console.WriteLine(ticket.Start + ticket.End + ticket.Date);
            compraTicket(compra);
            return Ok();
        }

        public void compraTicket(List<string> compra)
        {
            user = sendU.get();
            Console.WriteLine(user);
            jsonmanage.añadircompra(user, compra);
        }
    }

    public class TicketData
    {
        public string Start { get; set; }
        public string End { get; set; }
        public string Date { get; set; }
    }
}
