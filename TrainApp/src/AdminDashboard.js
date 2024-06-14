import React, { useState } from 'react';
import AdminRoutes from './AdminRoutes';
import ViewReservations from './ViewReservations';

function AdminDashboard() {
  const [searchUser, setSearchUser] = useState('');
  const [reservations, setReservations] = useState([]);
  const [viewAllTickets, setViewAllTickets] = useState(false);

  const handleSearch = () => {
    // Lógica para buscar las reservaciones por nombre de usuario
    fetch(`http://localhost:5006/api/reservations?user=${searchUser}`)
      .then(response => response.json())
      .then(data => {
        setReservations(data);
      })
      .catch(error => console.error('Error fetching reservations:', error));
  };

  const handleViewAllTickets = () => {
    setViewAllTickets(true);
  };

  return (
    <div className="AdminDashboard">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <h2>Manage Routes</h2>
        <AdminRoutes />
      </div>
      <div className="admin-section">
        <h2>View Reservations</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {reservations.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.user}</td>
                  <td>{reservation.salida}</td>
                  <td>{reservation.llegada}</td>
                  <td>{reservation.cantidad}</td>
                  <td>{reservation.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="admin-section">
        <button onClick={handleViewAllTickets}>View All Tickets</button>
        {viewAllTickets && (
          <ViewReservations />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
