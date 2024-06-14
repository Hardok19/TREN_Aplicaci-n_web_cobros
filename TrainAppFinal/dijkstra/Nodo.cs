using System.Collections.Generic;

namespace GrafoRutas
{
    public class Nodo
    {
        public string Nombre { get; set; }
        public List<Arista> Aristas { get; set; }

        public Nodo(string nombre)
        {
            Nombre = nombre;
            Aristas = new List<Arista>();
        }
    }
}