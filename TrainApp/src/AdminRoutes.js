import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRoutes = () => {
  const [graphData, setGraphData] = useState({ Nodos: [] });
  const [newRoute, setNewRoute] = useState({ from: '', to: '', distance: '', price: '635₡' });

  useEffect(() => {
    fetch('/grafo.json')
      .then(response => response.json())
      .then(data => setGraphData(data));
  }, []);

  const handleAddRoute = () => {
    const updatedGraphData = { ...graphData };
    const fromNode = updatedGraphData.Nodos.find(node => node.Nombre === newRoute.from);
    const toNode = updatedGraphData.Nodos.find(node => node.Nombre === newRoute.to);

    if (fromNode && toNode) {
      fromNode.Aristas.push({ Destino: newRoute.to, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price });
      toNode.Aristas.push({ Destino: newRoute.from, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price });
    } else {
      if (!fromNode) {
        updatedGraphData.Nodos.push({ Nombre: newRoute.from, Aristas: [{ Destino: newRoute.to, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price }] });
      } else {
        fromNode.Aristas.push({ Destino: newRoute.to, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price });
      }

      if (!toNode) {
        updatedGraphData.Nodos.push({ Nombre: newRoute.to, Aristas: [{ Destino: newRoute.from, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price }] });
      } else {
        toNode.Aristas.push({ Destino: newRoute.from, Distancia: parseFloat(newRoute.distance), Precio: newRoute.price });
      }
    }

    setGraphData(updatedGraphData);

    axios.post('/api/save-grafo', updatedGraphData)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error saving graph data:', error));
  };

  return (
    <div>
      <h2>Manage Routes</h2>
      <div>
        <input
          type="text"
          placeholder="From"
          value={newRoute.from}
          onChange={e => setNewRoute({ ...newRoute, from: e.target.value })}
        />
        <input
          type="text"
          placeholder="To"
          value={newRoute.to}
          onChange={e => setNewRoute({ ...newRoute, to: e.target.value })}
        />
        <input
          type="text"
          placeholder="Distance"
          value={newRoute.distance}
          onChange={e => setNewRoute({ ...newRoute, distance: e.target.value })}
        />
        <button onClick={handleAddRoute}>Add Route</button>
      </div>
      {graphData.Nodos.map((nodo, index) => (
        <div key={index}>
          <h3>{nodo.Nombre}</h3>
          {nodo.Aristas.map((arista, idx) => (
            <div key={idx}>
              {arista.Destino} - {arista.Distancia} km - {arista.Precio} <button>Edit</button> <button>Delete</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminRoutes;
