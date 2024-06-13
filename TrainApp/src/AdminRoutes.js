import React, { useState, useEffect } from 'react';
import { GetTrainRoutes, AddTrainRoute, DeleteTrainRoute, UpdateTrainRoute } from './services/TrainRouteService';

function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ start: '', end: '', cost: '', distanceInKm: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({});

  useEffect(() => {
    async function fetchRoutes() {
      const routes = await GetTrainRoutes();
      setRoutes(routes);
    }

    fetchRoutes();
  }, []);

  const handleAddRoute = async () => {
    await AddTrainRoute(newRoute);
    setRoutes([...routes, newRoute]);
    setNewRoute({ start: '', end: '', cost: '', distanceInKm: '' });
  };

  const handleDeleteRoute = async (index) => {
    const route = routes[index];
    await DeleteTrainRoute(route.id);
    setRoutes(routes.filter((_, i) => i !== index));
  };

  const handleEditRoute = (index) => {
    setIsEditing(true);
    setCurrentRoute(routes[index]);
  };

  const handleUpdateRoute = async () => {
    await UpdateTrainRoute(currentRoute);
    const updatedRoutes = routes.map((route) =>
      route.id === currentRoute.id ? currentRoute : route
    );
    setRoutes(updatedRoutes);
    setIsEditing(false);
    setCurrentRoute({});
  };

  return (
    <div>
      <h2>Admin Routes</h2>
      <div>
        <input
          type="text"
          placeholder="Start"
          value={newRoute.start}
          onChange={(e) => setNewRoute({ ...newRoute, start: e.target.value })}
        />
        <input
          type="text"
          placeholder="End"
          value={newRoute.end}
          onChange={(e) => setNewRoute({ ...newRoute, end: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cost"
          value={newRoute.cost}
          onChange={(e) => setNewRoute({ ...newRoute, cost: e.target.value })}
        />
        <input
          type="text"
          placeholder="Distance"
          value={newRoute.distanceInKm}
          onChange={(e) => setNewRoute({ ...newRoute, distanceInKm: e.target.value })}
        />
        <button onClick={handleAddRoute}>Add Route</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Cost</th>
            <th>Distance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td>{route.start}</td>
              <td>{route.end}</td>
              <td>{route.cost}</td>
              <td>{route.distanceInKm}</td>
              <td>
                <button onClick={() => handleEditRoute(index)}>Edit</button>
                <button onClick={() => handleDeleteRoute(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div>
          <input
            type="text"
            placeholder="Start"
            value={currentRoute.start}
            onChange={(e) => setCurrentRoute({ ...currentRoute, start: e.target.value })}
          />
          <input
            type="text"
            placeholder="End"
            value={currentRoute.end}
            onChange={(e) => setCurrentRoute({ ...currentRoute, end: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cost"
            value={currentRoute.cost}
            onChange={(e) => setCurrentRoute({ ...currentRoute, cost: e.target.value })}
          />
          <input
            type="text"
            placeholder="Distance"
            value={currentRoute.distanceInKm}
            onChange={(e) => setCurrentRoute({ ...currentRoute, distanceInKm: e.target.value })}
          />
          <button onClick={handleUpdateRoute}>Update Route</button>
        </div>
      )}
    </div>
  );
}

export default AdminRoutes;
