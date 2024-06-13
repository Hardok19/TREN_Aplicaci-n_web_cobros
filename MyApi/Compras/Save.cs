using System.Text.Json;
using GrafoRutas;


namespace compras{
    // Clase que representa una compra
public class Users
{
    public string User { get; set; }
    public string Pass { get; set; }
    public List<Compra> Compras { get; set; }
}

public class Compra
{
    public string Salida { get; set; }
    public string Llegada { get; set; }
    public int? Cantidad { get; set; }
    public int? Precio { get; set; }
}


    



    public class jsonmanage {


        List<Users> lista = new List<Users>();
        

        Grafo  grafo = new Grafo();
        public void SaveUsersToJson(List<Users> users, string filePath){
            var options = new JsonSerializerOptions
            {
                WriteIndented = true, // Para que el JSON sea más legible
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            string jsonString = JsonSerializer.Serialize(users, options);
            File.WriteAllText(filePath, jsonString);
        }

        public List<Users> LoadUsersFromJson(string filePath){
            string jsonString = File.ReadAllText(filePath);
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Deserialize<List<Users>>(jsonString, options);
        }
        


        public void a1(){ //Ejemplo de como modificar Users
            List<Users> a = LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\users.json");

            lista = a;
            lista.Add(new Users{User = "1", Pass = "1"});

            List<string> frag =  grafo.Dijkstra("Paraiso", "Tres Rios").Ruta;
            double dis = grafo.Dijkstra("Paraiso", "Tres Rios").DistanciaTotal;
            int pre = (int)(dis + 25);
            

            foreach(Users user in lista){
                if (user.User == "1"){
                    user.Compras = new List<Compra>();
                    user.Compras.Add(new Compra{Salida = "Paraiso", Llegada = "Tres Rios", Cantidad = 1, Precio = pre});


                }
            }
            List<string> listaa = new List<string>();

            // Recorre la lista de usuarios y extrae los datos
            foreach (var usuario in lista){
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
            Console.WriteLine(listaa);
            SaveUsersToJson(lista,"C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\Guía\\MyApi\\users.json");
        }
    }
}



