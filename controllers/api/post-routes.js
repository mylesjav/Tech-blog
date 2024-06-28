const router = require("express").Router();
const { Post } = require("../../models");
const auth = require("../../utils/auth");

// Create a new post
router.post("/", auth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error("Error creating a new post:", err);
    res.status(400).json(err);
  }
});

// Update a post
router.put("/:id", auth, async (req, res) => {
  try {
    const affectedRows = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("Could not update post, not found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("Error updating the post:", err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("Could not delete post, none found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("Error deleting the post:", err);
    res.status(500).json(err);
  }
});

module.exports = router;