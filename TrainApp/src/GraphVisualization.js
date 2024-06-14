import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, MarkSeries, LabelSeries } from 'react-vis';

const GraphVisualization = ({ graphData }) => {
  console.log('Graph data in visualization:', graphData);

  // Assign positions for nodes
  const nodePositions = {};
  const angleIncrement = (2 * Math.PI) / graphData.Nodos.length;
  graphData.Nodos.forEach((nodo, index) => {
    const angle = index * angleIncrement;
    nodePositions[nodo.Nombre] = {
      x: 250 + 200 * Math.cos(angle),
      y: 100 + 100 * Math.sin(angle),
      label: nodo.Nombre
    };
  });

  const nodes = Object.values(nodePositions);

  const edges = [];
  const labels = [];
  graphData.Nodos.forEach((nodo) => {
    nodo.Aristas.forEach((arista) => {
      const startNode = nodePositions[nodo.Nombre];
      const endNode = nodePositions[arista.Destino];

      edges.push({
        x1: startNode.x,
        y1: startNode.y,
        x2: endNode.x,
        y2: endNode.y,
        distancia: arista.Distancia
      });

      const midX = (startNode.x + endNode.x) / 2;
      const midY = (startNode.y + endNode.y) / 2;

      const direction = endNode.x > startNode.x ? '-->' : '<--';

      labels.push({
        x: midX,
        y: midY,
        label: `${arista.Distancia} km ${direction}`,
        style: { fill: 'green', fontSize: '13px' }
      });

      const arrowX = (startNode.x + midX) / 2;
      const arrowY = (startNode.y + midY) / 2;

      labels.push({
        x: arrowX,
        y: arrowY,
        label: direction,
        style: { fill: 'blue', fontSize: '13px' }
      });
    });
  });

  return (
    <XYPlot width={1000} height={600} xDomain={[0, 500]} yDomain={[0, 200]}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      {edges.map((edge, index) => (
        <LineSeries
          key={index}
          data={[
            { x: edge.x1, y: edge.y1 },
            { x: edge.x2, y: edge.y2 }
          ]}
          style={{ stroke: 'blue' }}
        />
      ))}
      <MarkSeries
        data={nodes.map((node) => ({ x: node.x, y: node.y }))}
        size={5}
        style={{ fill: 'red' }}
      />
      <LabelSeries
        data={nodes.map((node) => ({
          x: node.x,
          y: node.y,
          label: node.label,
          style: { fill: 'black', fontSize: '12px' }
        }))}
      />
      <LabelSeries
        data={labels}
      />
    </XYPlot>
  );
};

export default GraphVisualization;
