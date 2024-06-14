import React, { useState, useEffect } from 'react';
import GraphVisualization from './GraphVisualization';

function RoutesDashboard() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch('/grafo.json')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setGraphData(data);
      })
      .catch(error => console.error('Error fetching graph data:', error));
  }, []);

  return (
    <div className="RoutesDashboard">
      <h1>Routes</h1>
      {graphData ? (
        <GraphVisualization graphData={graphData} />
      ) : (
        <p>Loading graph data...</p>
      )}
    </div>
  );
}

export default RoutesDashboard;
