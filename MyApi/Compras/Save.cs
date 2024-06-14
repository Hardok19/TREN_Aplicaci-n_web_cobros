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


    



    public static class jsonmanage {


        static List<Users> lista = new List<Users>();
        
        public static void SaveUsersToJson(List<Users> users, string filePath){
            // Utiliza un HashSet para filtrar usuarios duplicados basados en el nombre de usuario
            var uniqueUsers = new HashSet<string>();
            var distinctUsers = users.Where(u => uniqueUsers.Add(u.User)).ToList();

            var options = new JsonSerializerOptions
            {
                WriteIndented = true, // Para que el JSON sea más legible
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            string jsonString = JsonSerializer.Serialize(distinctUsers, options);
            File.WriteAllText(filePath, jsonString);
        }

        public static List<Users> LoadUsersFromJson(string filePath){
            


            string jsonString = File.ReadAllText(filePath);
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Deserialize<List<Users>>(jsonString, options);
        }


        public static void añadircompra(string user, List<string> compra1){
            List<Users> json = LoadUsersFromJson("C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\users.json");
            foreach(Users userinlist in json){
                Console.WriteLine(user + " -----" + userinlist.User);
                if(userinlist.User == user){
                    if(userinlist.Compras != new List<Compra>()){
                        userinlist.Compras.Add(new Compra{Salida = compra1[0], Llegada = compra1[1], Cantidad = 1, Precio = 1});
                    }
                    else{
                        userinlist.Compras = new List<Compra>();
                        userinlist.Compras.Add(new Compra{Salida = compra1[0], Llegada = compra1[1], Cantidad = 1, Precio = 1});
                    }
                    SaveUsersToJson(json, "C:\\Users\\Hardok\\Desktop\\Proyecto 3 datos 1\\TREN_Aplicaci-n_web_cobros-Grafos-y-admin\\MyApi\\users.json");

                }
            }
        }









        

    }
}



