const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/save-grafo', (req, res) => {
  const filePath = path.join(__dirname, '../TrainApp/public/grafo.json');
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('Error saving graph data:', err);
      return res.status(500).send('Error saving graph data');
    }
    res.send('Graph data saved successfully');
  });
});

module.exports = router;
