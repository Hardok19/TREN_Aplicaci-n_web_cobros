using Microsoft.AspNetCore.Mvc;
using compras;
using GrafoRutas;

namespace MyApi.Controllers
{
    [Route("api/authenticate")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        Grafo grafo = Grafo.CargarDesdeJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\dijkstra\\grafo.json");
        
        List<Users> loadedUserList = new List<Users>();

        public List<string> usuarioactivo = new List<string>();


        [HttpPost]
        public IActionResult Authenticate([FromBody] UserCredentials credentials)

        {   
            


            loadedUserList = jsonmanage.LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\users.json");


            // Verificar las credenciales (por ejemplo, en una base de datos)
            if (IsValid(credentials.Username, credentials.Username) == "true")
            {   

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
                        sendU.Editor(usuarioactivo[0]);
                        Console.WriteLine(usuarioactivo[0]);
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

    public static class sendU{
        public static string user = "";

        public static void Editor(string name){
            user = name;
        }

        public static string get(){
            return user;
        }


    }


}