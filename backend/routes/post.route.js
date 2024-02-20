const express = require("express");
const postRoute = express.Router();
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { trusted } = require("mongoose");

postRoute.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const isPostAdded = await Post.findOne({ userId: userId });
    if (isPostAdded) {
      return res.status(200).send({ added: true });
    } else {
      return res.status(200).send({ added: false });
    }
  } catch (error) {
    console.log(error.message);
  }
});

postRoute.post("/", async (req, res) => {
  const { userId, posts } = req.body;
  try {
    const isPost = await Post.findOne({ userId: userId });

    if (isPost) {
      return res.status(409).send({ message: "Posts are already added !" });
    }

    const newPost = new Post({ userId, posts });
    await newPost.save();
    return res.status(201).send({ message: "Posts added" });
  } catch (error) {
    console.log(error.message);
    return res.status(501).send({ message: "Error in adding posts" });
  }
});

module.exports = { postRoute };
