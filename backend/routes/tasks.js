const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");

router.get("/", (req, res) => {
  Task.find({})
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(400).json(error));
});

router.post("/", async (req, res) => {
  const user = req.body.user;
  const email = user.email;
  const task = req.body.task;

  const dbUser = await User.findOne({ email });

  const newTask = new Task({ ...task });
  newTask.title = task.title;
  newTask.description = task.description;
  newTask.userId = dbUser;

  newTask
    .save()
    .then(() => res.status(200).send(newTask))
    .catch((error) => res.status(400).send(error));
});

router.patch("/", (req, res) => {
  try {
    Task.findOneAndUpdate(
      {
        _id: req.body.task,
      },
      {
        $set: req.body.task,
      },
      {
        new: true,
      }
    )
      .exec()
      .then((task) => {
        res.status(200).send(task);
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
