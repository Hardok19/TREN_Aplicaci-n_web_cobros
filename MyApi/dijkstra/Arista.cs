namespace GrafoRutas
{
    public class Arista
    {
        public string Destino { get; set; }
        public double Distancia { get; set; }

        public Arista(string destino, double distancia)
        {
            Destino = destino;
            Distancia = distancia;
        }
    }
}