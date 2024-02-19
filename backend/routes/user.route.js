const express = require("express");
const userRoute = express.Router();

const User = require("../models/user.model");

userRoute.get("/", async (req, res) => {
  res.send("Users");
});

module.exports = { userRoute };
