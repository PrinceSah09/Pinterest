var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async (req, res) => {
  try {
    const newUser = await userModel.create({
      username: "Krishna",
      password: "Krishna",
      posts: ["65f04aa8c8ebfba6b7ef5c92"],
      email: "krishna@gmail.com",
      fullname: "Krishna",
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/createpost", async (req, res) => {
  const createdpost = await postModel.create({
    postText: "Hello everyone!",
    user: "65f04aa8c8ebfba6b7ef5c92",
  });
  let user = await userModel.findOne({ _id: "65f04aa8c8ebfba6b7ef5c92" });
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done");
});

router.get("/allpost", async (req, res) => {
  const post = await postModel.find();
  res.send(post);
});

router.get("/alluser", async (req, res) => {
  const post = await userModel.find().populate("posts");
  res.send(post);
});

module.exports = router;
