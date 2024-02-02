const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  location: { type: Number, required: true }
});

const GameSchema = new Schema({
  name: { type: String, required: true },
  characters: [CharacterSchema]
});

module.exports = mongoose.model("Game", GameSchema);
