const mongoose = require("mongoose");
const Game = require("./models/game"); 
const score = require("./models/score");

// Provide option to read from .env file
require('dotenv').config()

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Create a new game instance
const newGame = new Game({
  name: "Your Game Name",
  characters: [
    { name: "Character1", location: 1 },
    { name: "Character2", location: 2 },
    { name: "Character3", location: 3 },
    { name: "Character4", location: 4 }
  ]
});

const newScore = new score({
  name: "Tony",
  time: 20.24,
})

// Save the new game instance to the database
newGame.save()
  .then((result) => {
    console.log("New game saved:", result);
    return newScore.save()
  })
  .then((scoreResult) => {
    console.log("New score saved:", scoreResult)
  })
  .catch((error) => {
    console.error("Error saving game:", error);
  })
  .finally(() => {
    // Close the MongoDB connection after saving
    mongoose.connection.close();
  });


