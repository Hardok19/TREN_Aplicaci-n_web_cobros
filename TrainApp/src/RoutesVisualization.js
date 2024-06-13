import React, { useState, useEffect } from 'react';
import { GetTrainRoutes } from './services/TrainRouteService';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 9.934739,
  lng: -84.087502
};

function RoutesVisualization() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function fetchRoutes() {
      const routes = await GetTrainRoutes();
      setRoutes(routes);
    }

    fetchRoutes();
  }, []);

  const renderRoutes = () => {
    return routes.map((route, index) => (
      <Polyline
        key={index}
        path={[
          { lat: route.startLat, lng: route.startLng },
          { lat: route.endLat, lng: route.endLng }
        ]}
        options={{ strokeColor: '#FF0000' }}
      />
    ));
  };

  return (
    <div>
      <h2>Train Routes</h2>
      <LoadScript googleMapsApiKey="AIzaSyDi4PZ-n2b84__HBHtUqf94r1AIL9EXnT8">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {renderRoutes()}
        </GoogleMap>
      </LoadScript>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Cost</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td>{route.start}</td>
              <td>{route.end}</td>
              <td>{route.cost}</td>
              <td>{route.distanceInKm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoutesVisualization;
