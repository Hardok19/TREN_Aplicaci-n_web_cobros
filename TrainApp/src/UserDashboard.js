import React, { useEffect, useState } from 'react';

function UserDashboard() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5006/api/WeatherForecast')
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="UserDashboard">
      <h1>Weather Forecast</h1>
      <ul>
        {weather.map((condition, index) => (
          <li key={index}>{condition}</li>
        ))}
      </ul>
    </div>
  );
}


export default UserDashboard;
