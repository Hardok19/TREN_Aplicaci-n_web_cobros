using System.Collections.Specialized;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using compras;
using Microsoft.AspNetCore.Http.Connections;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

public class aController : ControllerBase
    {

        [HttpPost]
        public IActionResult Post([FromBody] ActionRequest request)
        {

            if (request.Action == "start")
            {
                request.Ola();
                // Lógica para manejar la acción "start"
                return Ok(new { message = "Action started successfully" });
            }

            return BadRequest(new { message = "Invalid action" });
        }
    }

    public class ActionRequest
    {
        jsonmanage prue = new jsonmanage();
        public string Action { get; set; }

        public void Ola(){
            prue.a1();
            Console.WriteLine(prue.LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\users.json"));
            Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        }
    }
    public class usersController : ControllerBase{
        jsonmanage prue = new jsonmanage();

        [HttpPost]
        public IActionResult Getusers(){

            List<Users> loadedUserList = prue.LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\users.json");

            List<string> listaa = new List<string>();

            // Recorre la lista de usuarios y extrae los datos
            foreach (var usuario in loadedUserList){
                foreach (var compra in usuario.Compras)
                {
                    string salida = compra.Salida ?? "null";
                    string llegada = compra.Llegada ?? "null";
                    string cantidad = compra.Cantidad.HasValue ? compra.Cantidad.Value.ToString() : "null";
                    string precio = compra.Precio.HasValue ? compra.Precio.Value.ToString() : "null";

                    string resultado = $"User: {usuario.User}, Pass: {usuario.Pass}, Salida: {salida}, Llegada: {llegada}, Cantidad: {cantidad}, Precio: {precio}";
                    listaa.Add(resultado);
                }
            }
            Console.WriteLine(listaa.ToString());

            return Ok(listaa);

        }
}



    

    
}