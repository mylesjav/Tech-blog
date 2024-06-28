const router = require("express").Router();
const { User } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error("Error creating new user:", err);
    res.status(400).json(err);
  }
});

// Log in a user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Wrong email and/or password, try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Wrong email and/or password, try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({
        user: userData,
        message: `Login complete. Welcome ${req.session.username}.`,
      });
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(400).json(err);
  }
});

// Check a users login status
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.json({ logged_in: true, id: req.session.user_id });
  } else {
    res.json({ logged_in: false, id: null });
  }
});

module.exports = router;