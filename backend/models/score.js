const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  level: { type: String, required: true },
  name: { type: String, required: true },
  time: { type: Number, required: true}
});

module.exports = mongoose.model("Score", ScoreSchema);
