const mongoose = require("mongoose");
const { stringify } = require("querystring");

mongoose.connect("mongodb://127.0.0.1:27017/pinterestDB");

const postSchema = mongoose.Schema({
  imageText: { type: String  },
  image: {type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Array, default: [] },
});

module.exports = mongoose.model("Post", postSchema);
