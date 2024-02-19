const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
