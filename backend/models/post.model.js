const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  posts: {
    type: [],
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
