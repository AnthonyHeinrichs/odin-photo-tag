const express = require('express');
const Score = require('./models/score');
const Game = require('./models/game');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const port = 5000;

// Provide option to read from .env file
require('dotenv').config()

const app = express();

// Enable CORS and parsing for routes
app.use(cors());
app.use(bodyParser.json());

// Set up mongoose connection
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Bring in API key
const API_KEY = process.env.API_KEY;

// Middleware to verify API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.header('X-API-Key');

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden - Invalid API key' });
  }

  next();
};

// Routes
app.get('/games', verifyApiKey, async (req, res) => {
  try {
    const games = await Game.find();

    res.json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/leaderboard', verifyApiKey, async (req, res) => {
  try {
    const scores = await Score.find({}, { __v: 0 });

    res.json({ scores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/leaderboard', verifyApiKey, async (req, res) => {
  try {
    const { level, name, time } = req.body;

    const newScore = new Score({
      level,
      name,
      time,
    });

    await newScore.save();

    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app; 
