const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  const role = "developer";
  User.find({ role })
    .sort({ username: 1 })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.user.email;
    const password = req.body.user.password;

    if (!email || !password) {
      return res.status(400).json("Email and password are mandatory fields!");
    }

    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(400).json("Wrong credentials for user!");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
