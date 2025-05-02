const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

mongoose.connect("mongodb://localhost:27017/lyricapp");

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  pass: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

// Song Schema
const songSchema = new mongoose.Schema({
  song: String,
  lyricist: String,
  lyrics: String,
  user: String,
});

const Song = mongoose.model("Song", songSchema);

// Register
app.post("/api/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { name, pass } = req.body;
  const user = await User.findOne({ name, pass });
  if (user) {
    res.send(user);
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted" });
});

// Add song
app.post("/api/songs", async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.status(201).send(song);
});

// Get all songs
app.get("/api/songs", async (req, res) => {
  const songs = await Song.find();
  res.send(songs);
});

// Delete song
app.delete("/api/songs/:id", async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.send({ message: "Song deleted" });
});

// Update song
app.put("/api/songs/:id", async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(song);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
