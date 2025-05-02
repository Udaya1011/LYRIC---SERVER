const express = require("express");
const router = express.Router();
const Song = require("../models/songModel");

// Add song
router.post("/", async (req, res) => {
  const { song, lyricist, lyrics, user } = req.body;
  if (!song || !lyricist || !lyrics || !user) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newSong = new Song({ song, lyricist, lyrics, user });
  await newSong.save();
  res.status(201).json({ message: "Song added" });
});

// Get all songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// Update song
router.put("/:id", async (req, res) => {
  const { song, lyricist, lyrics } = req.body;
  await Song.findByIdAndUpdate(req.params.id, { song, lyricist, lyrics });
  res.json({ message: "Song updated" });
});

// Delete song
router.delete("/:id", async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
});

module.exports = router;
