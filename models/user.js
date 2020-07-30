const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlegth: 50,
  },
  password: {
    type: String,
    minlength: 5,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  lastname: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
