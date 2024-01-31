const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const port = 5000;

// Provide option to read from .env file
require('dotenv').config()

const app = express();

// Enable CORS for all routes
app.use(cors());

// Setup routes
app.get('/games', (req, res) => {
  res.send('Games data');
})

app.get('/leaderboard', (req,res) => {
  res.send('Leaderboard data');
})

app.post('/leaderboard', (req, res) => {
  res.send('Leaderboard updated')
})

// Set up mongoose connection
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});