namespace TrainRouteApp
{
    public class Nodo
    {
        public string Id { get; set; }
        public string Nombre { get; set; }

        public Nodo(string id, string nombre)
        {
            Id = id;
            Nombre = nombre;
        }
    }
}
