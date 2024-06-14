using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Globalization;
using System.Text;

namespace GrafoRutas
{
    public class Grafo
    {
        public List<Nodo> Nodos { get; set; }

        public Grafo()
        {
            Nodos = new List<Nodo>();
        }

        public Nodo ObtenerNodo(string nombre)
        {
            return Nodos.Find(n => n.Nombre == nombre);
        }

        public void AgregarRuta(string origen, string destino, double distancia, bool esBidireccional)
        {
            Nodo nodoOrigen = ObtenerNodo(origen);
            Nodo nodoDestino = ObtenerNodo(destino);

            if (nodoOrigen == null)
            {
                nodoOrigen = new Nodo(origen);
                Nodos.Add(nodoOrigen);
            }

            if (nodoDestino == null)
            {
                nodoDestino = new Nodo(destino);
                Nodos.Add(nodoDestino);
            }

            nodoOrigen.Aristas.Add(new Arista(destino, distancia));
            if (esBidireccional)
            {
                nodoDestino.Aristas.Add(new Arista(origen, distancia));
            }
        }

        public void MostrarGrafo()
        {
            foreach (var nodo in Nodos)
            {
                Console.WriteLine($"Nodo {nodo.Nombre}:");
                foreach (var arista in nodo.Aristas)
                {
                    Console.WriteLine($"  -> {arista.Destino} (Distancia: {arista.Distancia} km)");
                }
            }
        }

        public void GuardarEnJson(string filePath)
        {
            var json = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(filePath, json);
        }

        public static Grafo CargarDesdeJson(string filePath)
        {
            var json = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<Grafo>(json);
        }
        public void EliminarNodo(string nombre)
        {
            Nodo nodoAEliminar = ObtenerNodo(nombre);
            if (nodoAEliminar != null)
            {
                // Eliminar todas las aristas que apuntan a este nodo
                foreach (var nodo in Nodos)
                {
                    nodo.Aristas.RemoveAll(a => a.Destino == nombre);
                }

                // Eliminar el nodo
                Nodos.Remove(nodoAEliminar);
            }
        }
        public string NormalizeName(string name)
        {
            string normalizedString = name.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder
                .ToString()
                .Normalize(NormalizationForm.FormC)
                .ToLower();
        }
        
        public (List<string> Ruta, double DistanciaTotal) Dijkstra(string Inicio, string Fin)
        {
            var distancias = new Dictionary<string, double>();
            var previo = new Dictionary<string, string>();
            var noVisitados = new List<string>();
            string inicio = NormalizeName(Inicio);
            string fin = NormalizeName(Fin);

            foreach (var nodo in Nodos)
            {
                distancias[nodo.Nombre] = double.MaxValue;
                previo[nodo.Nombre] = null;
                noVisitados.Add(nodo.Nombre);
            }

            distancias[inicio] = 0;

            while (noVisitados.Count > 0)
            {
                noVisitados.Sort((x, y) => distancias[x].CompareTo(distancias[y]));
                var nodoActual = noVisitados[0];
                noVisitados.Remove(nodoActual);

                if (nodoActual == fin)
                {
                    var ruta = new List<string>();
                    double distanciaTotal = distancias[nodoActual];
                    while (previo[nodoActual] != null)
                    {
                        ruta.Add(nodoActual);
                        nodoActual = previo[nodoActual];
                    }
                    ruta.Add(inicio);
                    ruta.Reverse();
                    return (ruta, distanciaTotal);
                }

                var nodo = ObtenerNodo(nodoActual);
                foreach (var arista in nodo.Aristas)
                {
                    var distanciaAlternativa = distancias[nodoActual] + arista.Distancia;
                    if (distanciaAlternativa < distancias[arista.Destino])
                    {
                        distancias[arista.Destino] = distanciaAlternativa;
                        previo[arista.Destino] = nodoActual;
                    }
                }
            }

            return (null, double.MaxValue); // No hay camino
        }
        public void ModificarDistancia(string origen, string destino, double nuevaDistancia)
        {
            Nodo nodoOrigen = ObtenerNodo(origen);
            Nodo nodoDestino = ObtenerNodo(destino);

            if (nodoOrigen != null)
            {
                var arista = nodoOrigen.Aristas.Find(a => a.Destino == destino);
                if (arista != null)
                {
                    arista.Distancia = nuevaDistancia;
                }
            }

            if (nodoDestino != null)
            {
                var arista = nodoDestino.Aristas.Find(a => a.Destino == origen);
                if (arista != null)
                {
                    arista.Distancia = nuevaDistancia;
                }
            }
        }
    }
}
