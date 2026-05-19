const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Stockage en mémoire (reset au redémarrage)
const feedbacks = [];

// GET /feedbacks
app.get('/feedbacks', (req, res) => {
  res.json(feedbacks);
});

// POST /feedbacks
app.post('/feedbacks', (req, res) => {
  const { title } = req.body;
  const newFeedback = {
    id: Date.now().toString(),
    title,
  };
  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});