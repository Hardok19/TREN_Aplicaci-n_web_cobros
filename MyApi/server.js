const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5009;

// Middleware
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../TrainApp/build')));

// API route to save graph data
app.post('/api/save-grafo', (req, res) => {
  const filePath = path.join(__dirname, '../TrainApp/public/grafo.json');
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('Error saving graph data:', err);
      return res.status(500).send('Error saving graph data');
    }
    res.send('Graph data saved successfully');
  });
});

// Fallback route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../TrainApp/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
