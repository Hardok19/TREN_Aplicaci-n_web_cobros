using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TrainRouteApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private static List<TrainRoute> routes = new List<TrainRoute>();

        [HttpGet]
        public IEnumerable<TrainRoute> Get()
        {
            return routes;
        }

        [HttpPost]
        public void Post([FromBody] TrainRoute route)
        {
            routes.Add(route);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            routes.RemoveAt(id);
        }
    }
}
