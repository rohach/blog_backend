const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create new Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userName === req.body.userName) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all Posts
router.get("/", async (req, res) => {
  const userName = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (userName) {
      posts = await Post.find({ userName });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
