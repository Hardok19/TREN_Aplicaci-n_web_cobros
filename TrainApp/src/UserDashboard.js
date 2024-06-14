import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function UserDashboard() {
  const [graphData, setGraphData] = useState(null);
  const [ticketData, setTicketData] = useState({
    start: '',
    end: '',
    date: ''
  });

  const getCompra = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5006/api/Compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
  
      if (response.ok) {
        const data = await response.text(); // Assuming the server returns a string
        alert(data); // Alert the response string
      } else {
        alert('Error: ' + response.statusText);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  
  





  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5006/api/Tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });

      if (response.ok) {
        alert('Ticket comprado con éxito');
      } else {
        alert('Error al comprar el ticket');
      }
    } catch (error) {
      console.error('Error al enviar los datos del ticket:', error);
      alert('Error al enviar los datos del ticket');
    }
  };

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

  const saveGraphData = async (data) => {
    try {
      await axios.post('/save-grafo', data);
    } catch (error) {
      console.error('Error saving graph data:', error);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
      <form onSubmit={getCompra}>
        <button type="submit" className="align-right">Tickets Comprados</button>
      </form>
      </div>

      {graphData && (
        <div>
          <div>
            <h3>Comprar ticket</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Inicio"
                value={ticketData.start}
                onChange={(e) => setTicketData({ ...ticketData, start: e.target.value })}
              />
              <input
                type="text"
                placeholder="Destino"
                value={ticketData.end}
                onChange={(e) => setTicketData({ ...ticketData, end: e.target.value })}
              />
              <input
                type="text"
                placeholder="Fecha"
                value={ticketData.date}
                onChange={(e) => setTicketData({ ...ticketData, date: e.target.value })}
              />
              <button type="submit">Comprar</button>
            </form>
          </div>
          {graphData.Nodos.map((nodo) => (
            <div key={nodo.Nombre}>
              <h3>{nodo.Nombre}</h3>
              {nodo.Aristas.map((arista) => (
                <div key={arista.Destino}>
                  <span>{arista.Destino} - {arista.Distancia} km - {arista.Precio}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
