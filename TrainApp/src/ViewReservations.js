import React, { useState, useEffect } from 'react';

function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState({ user: '', date: '', route: '' });

  useEffect(() => {
    // Lógica para obtener todas las reservaciones
    fetch('http://localhost:5000/api/all-reservations')
      .then(response => response.json())
      .then(data => {
        setReservations(data);
      })
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (filter.user ? reservation.user.includes(filter.user) : true) &&
      (filter.date ? reservation.date.includes(filter.date) : true) &&
      (filter.route ? reservation.route.includes(filter.route) : true)
    );
  });

  return (
    <div>
      <h2>View All Tickets</h2>
      <div>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={filter.user}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={filter.date}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="route"
          placeholder="Route"
          value={filter.route}
          onChange={handleFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.user}</td>
              <td>{reservation.salida}</td>
              <td>{reservation.llegada}</td>
              <td>{reservation.cantidad}</td>
              <td>{reservation.precio}</td>
              <td>{reservation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReservations;
