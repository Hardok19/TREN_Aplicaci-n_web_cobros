import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [graphData, setGraphData] = useState(null);
  const [newRoute, setNewRoute] = useState({ Nombre: '', Destino: '', Distancia: '', Precio: '635₡' });
  const [editRoute, setEditRoute] = useState(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    try {
      const response = await axios.get('/grafo.json');
      setGraphData(response.data);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const handleAddRoute = () => {
    const updatedGraphData = { ...graphData };
    const nodo = updatedGraphData.Nodos.find(n => n.Nombre === newRoute.Nombre);
    if (nodo) {
      nodo.Aristas.push({
        Destino: newRoute.Destino,
        Distancia: parseFloat(newRoute.Distancia),
        Precio: newRoute.Precio
      });
    } else {
      updatedGraphData.Nodos.push({
        Nombre: newRoute.Nombre,
        Aristas: [{
          Destino: newRoute.Destino,
          Distancia: parseFloat(newRoute.Distancia),
          Precio: newRoute.Precio
        }]
      });
    }
    setGraphData(updatedGraphData);
    saveGraphData(updatedGraphData);
  };

  const handleEditRoute = (nodoIndex, aristaIndex) => {
    const updatedGraphData = { ...graphData };
    updatedGraphData.Nodos[nodoIndex].Aristas[aristaIndex] = editRoute;
    setGraphData(updatedGraphData);
    saveGraphData(updatedGraphData);
    setEditRoute(null);
  };

  const handleDeleteRoute = (nodoIndex, aristaIndex) => {
    const updatedGraphData = { ...graphData };
    updatedGraphData.Nodos[nodoIndex].Aristas.splice(aristaIndex, 1);
    if (updatedGraphData.Nodos[nodoIndex].Aristas.length === 0) {
      updatedGraphData.Nodos.splice(nodoIndex, 1);
    }
    setGraphData(updatedGraphData);
    saveGraphData(updatedGraphData);
  };

  const saveGraphData = async (data) => {
    try {
      await axios.post('/save-grafo', data);
    } catch (error) {
      console.error('Error saving graph data:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {graphData && (
        <div>
          <h2>Manage Routes</h2>
          <div>
            <h3>Add New Route</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={newRoute.Nombre}
              onChange={(e) => setNewRoute({ ...newRoute, Nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Destino"
              value={newRoute.Destino}
              onChange={(e) => setNewRoute({ ...newRoute, Destino: e.target.value })}
            />
            <input
              type="text"
              placeholder="Distancia"
              value={newRoute.Distancia}
              onChange={(e) => setNewRoute({ ...newRoute, Distancia: e.target.value })}
            />
            <button onClick={handleAddRoute}>Add Route</button>
          </div>
          {graphData.Nodos.map((nodo, nodoIndex) => (
            <div key={nodo.Nombre}>
              <h3>{nodo.Nombre}</h3>
              {nodo.Aristas.map((arista, aristaIndex) => (
                <div key={arista.Destino}>
                  <span>{arista.Destino} - {arista.Distancia} km - {arista.Precio}</span>
                  <button onClick={() => setEditRoute({ ...arista, nodoIndex, aristaIndex })}>Edit</button>
                  <button onClick={() => handleDeleteRoute(nodoIndex, aristaIndex)}>Delete</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {editRoute && (
        <div>
          <h3>Edit Route</h3>
          <input
            type="text"
            placeholder="Destino"
            value={editRoute.Destino}
            onChange={(e) => setEditRoute({ ...editRoute, Destino: e.target.value })}
          />
          <input
            type="text"
            placeholder="Distancia"
            value={editRoute.Distancia}
            onChange={(e) => setEditRoute({ ...editRoute, Distancia: e.target.value })}
          />
          <input
            type="text"
            placeholder="Precio"
            value={editRoute.Precio}
            onChange={(e) => setEditRoute({ ...editRoute, Precio: e.target.value })}
          />
          <button onClick={() => handleEditRoute(editRoute.nodoIndex, editRoute.aristaIndex)}>Save</button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
