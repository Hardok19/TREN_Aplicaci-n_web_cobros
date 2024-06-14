import React, { useState } from 'react';

function BuyTickets() {
  const [ticket, setTicket] = useState({ start: '', end: '', date: '' });
  const [tickets, setTickets] = useState([]);
  const [discount, setDiscount] = useState(0);

  const handleBuyTicket = () => {
    setTickets([...tickets, ticket]);
    const newDiscount = Math.min(90, tickets.length * 2);
    setDiscount(newDiscount);
    setTicket({ start: '', end: '', date: '' });
  };

  return (
    <div>
      <h2>Buy Tickets</h2>
      <div>
        <input
          type="text"
          placeholder="Start"
          value={ticket.start}
          onChange={(e) => setTicket({ ...ticket, start: e.target.value })}
        />
        <input
          type="text"
          placeholder="End"
          value={ticket.end}
          onChange={(e) => setTicket({ ...ticket, end: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={ticket.date}
          onChange={(e) => setTicket({ ...ticket, date: e.target.value })}
        />
        <button onClick={handleBuyTicket}>Buy Ticket</button>
      </div>
      <div>
        <h3>Discount: {discount}%</h3>
        <ul>
          {tickets.map((t, index) => (
            <li key={index}>
              {t.start} to {t.end} on {t.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BuyTickets;
