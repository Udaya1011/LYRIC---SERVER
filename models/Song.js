const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  song: { type: String, required: true },
  lyricist: { type: String, required: true },
  lyrics: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
