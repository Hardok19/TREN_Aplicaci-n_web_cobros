namespace TrainRouteApp
{
    public class Grafo
    {
        public List<Nodo> Nodos { get; set; }
        public List<Arista> Aristas { get; set; }

        public Grafo()
        {
            Nodos = new List<Nodo>();
            Aristas = new List<Arista>();
        }

        public void AgregarNodo(Nodo nodo)
        {
            Nodos.Add(nodo);
        }

        public void AgregarArista(Nodo nodoInicio, Nodo nodoFin, double peso)
        {
            Arista arista = new Arista(nodoInicio, nodoFin, peso);
            Aristas.Add(arista);
        }

        public Nodo ObtenerNodo(string id)
        {
            return Nodos.FirstOrDefault(n => n.Id == id);
        }
    }
}
