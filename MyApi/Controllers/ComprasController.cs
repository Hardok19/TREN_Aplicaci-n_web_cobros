using Microsoft.AspNetCore.Mvc;
using compras;
using GrafoRutas;

namespace MyApi.Controllers{
    [Route("api/Compra")]
    [ApiController]

    public class ComprasController : ControllerBase{
            
        private static string user = "";

        List<Users> json = new List<Users>();
        
        Grafo grafo = Grafo.CargarDesdeJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\dijkstra\\grafo.json");


            
        [HttpPost]
        public IActionResult Compra()
        {
            Console.WriteLine("Compra endpoint called.");
            return Ok(comprasEnvio()); // Example string response
        }


        private string comprasEnvio(){
            user = sendU.get();
            json = jsonmanage.LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\users.json");

            string result = "";
            foreach(Users user1 in json){
                Console.WriteLine("----------------------------------------------------------------------" + user + user1.User);
                if(user.ToString() == user1.User.ToString()){
                    foreach(Compra com in user1.Compras){
                        Console.WriteLine(com.Salida + com.Llegada);
                        result += "Ruta:"+ruta(grafo.Dijkstra(com.Salida, com.Llegada).Ruta) + "    Distancia:" + grafo.Dijkstra(com.Salida, com.Llegada).DistanciaTotal+"km" + "                                                    ";
                        Console.WriteLine(result);
                    }
                }
            }
            return result;
        }

        private string ruta(List<string> rut){
            string results = "";
            foreach(var paso in rut){
                results += paso + "-";
            }
            return results;
        }






    }
}