const express = require("express");
const userRoute = express.Router();
const { User } = require("../models/user.model");

userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error.message);
  }
});

userRoute.post("/", async (req, res) => {
  const { id } = req.body;

  try {
    const isUser = await User.findOne({ id: id });

    if (isUser) {
      return res.status(409).send({ message: "User is already Registered !" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).send({ message: "User added", user: newUser });
  } catch (error) {
    return res.status(501).send({ message: "Error in adding user" });
  }
});

module.exports = { userRoute };
