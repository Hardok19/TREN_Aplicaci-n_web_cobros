import React, { useState, useEffect } from 'react';

function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState({ user: '', date: '', route: '' });

  useEffect(() => {
    // Aquí se debe implementar la lógica para obtener las reservaciones desde el backend
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (filter.user ? reservation.user.includes(filter.user) : true) &&
      (filter.date ? reservation.date.includes(filter.date) : true) &&
      (filter.route ? reservation.route.includes(filter.route) : true)
    );
  });

  return (
    <div>
      <h2>View Reservations</h2>
      <div>
        <input
          type="text"
          placeholder="User"
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Route"
          value={filter.route}
          onChange={(e) => setFilter({ ...filter, route: e.target.value })}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.user}</td>
              <td>{reservation.date}</td>
              <td>{reservation.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReservations;
