const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

// Create a new comment
router.post("/", auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating a new comment:", err);
    res.status(400).json(err);
  }
});

// Update a comment
router.put("/:id", auth, async (req, res) => {
  try {
    const affectedRows = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("No comment found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("There was an error updating the comment:", err);
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", auth, async (req, res) => {
  try {
    const affectedRows = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("There was no comment found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("There was an error deleting the comment:", err);
    res.status(500).json(err);
  }
});

module.exports = router;