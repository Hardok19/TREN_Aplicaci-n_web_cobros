import React from 'react';

function AdminDashboard() {
  const handleButtonClick = () => {
    fetch('http://localhost:5006/api/a', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'start' }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Action triggered:', data);
    })
    .catch(error => console.error('Error triggering action:', error));
  };

  return (
    <div className="AdminDashboard">
      <button className="top-right-button" onClick={handleButtonClick}>Click Me</button>
      <h1>Admin Panel</h1>
    </div>
  );
}

export default AdminDashboard;
