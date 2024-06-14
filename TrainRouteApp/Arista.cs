namespace TrainRouteApp
{
    public class Arista
    {
        public Nodo NodoInicio { get; set; }
        public Nodo NodoFin { get; set; }
        public double Peso { get; set; }

        public Arista(Nodo nodoInicio, Nodo nodoFin, double peso)
        {
            NodoInicio = nodoInicio;
            NodoFin = nodoFin;
            Peso = peso;
        }
    }
}
