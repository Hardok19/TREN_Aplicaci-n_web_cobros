using Microsoft.AspNetCore.Mvc;
using compras;
using System.Security.Cryptography.X509Certificates;
using GrafoRutas;

namespace MyApi.Controllers{
    [Route("api/authenticate")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        jsonmanage prue = new jsonmanage();

        Grafo  grafo = Grafo.CargarDesdeJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\dijkstra\\grafo.json");
        
        List<Users> loadedUserList = new List<Users>();

        List<string> usuarioactivo = new List<string>();


        [HttpPost]
        public IActionResult Authenticate([FromBody] UserCredentials credentials)

        {   
            loadedUserList = prue.LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\users.json");


            // Verificar las credenciales (por ejemplo, en una base de datos)
            if (IsValid(credentials.Username, credentials.Username) == "true")
            {   
                Console.WriteLine(usuarioactivo);
                return Ok(usuarioactivo);
            }
            else
            {
                return Unauthorized();
            }
        }

        private string IsValid(string username, string password)
        {
            usuarioactivo = new List<string>();

            
            foreach(Users users in loadedUserList){
                if(username == users.User){
                    if(password == users.Pass){
                        usuarioactivo.Add(users.User);
                        foreach(Compra comp in users.Compras){

                            (List<string> Ruta, double DistanciaTotal) Dijkstra = grafo.Dijkstra(comp.Salida, comp.Llegada);

                            if(Dijkstra.Ruta != null){
                                foreach(string rut in Dijkstra.Ruta){
                                    usuarioactivo.Add(rut);
                                }
                            }

                            usuarioactivo.Add(Dijkstra.DistanciaTotal.ToString());
                        }
                        
                        return "true";
                    }
                    else{
                        return "contraseña incorrecta";
                    }
                }
            }
            return "No existe este usuario";
        }


    }

    public class UserCredentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}