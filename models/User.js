const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  image: { type: String }, // Store image URL if image is uploaded
});

const User = mongoose.model("User", userSchema);
module.exports = User;
