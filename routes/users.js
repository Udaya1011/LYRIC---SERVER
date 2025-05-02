const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Register
router.post("/register", async (req, res) => {
  const { name, pass, email, number, image } = req.body;
  if (!name || !pass || !email || !number) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = new User({ name, pass, email, number, image });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { name, pass } = req.body;
  const user = await User.findOne({ name, pass });
  if (!user) return res.status(404).json({ message: "Invalid credentials" });
  res.json(user);
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
