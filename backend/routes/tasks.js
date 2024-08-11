const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");

router.get("/", (req, res) => {
  Task.find({})
    .populate("userTester")
    .populate("userDeveloper")
    .populate("userTester2")
    .populate("userDeveloper2")
    .then((task) => {
      res.status(200).json(task);
      console.log(task);
    })
    .catch((error) => res.status(400).json(error));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = req.body.user;
  const email = user.email;
  const task = req.body.task;

  const dbUser = await User.findOne({ email });
  console.log(task);
  console.log(req.body.userDeveloper);
  console.log(req.body.userTester);

  const newTask = new Task({ ...task });
  newTask.title = task.title;
  newTask.description = task.description;
  newTask.type = task.taskType;
  newTask.priority = task.priority;
  newTask.userDeveloper = await User.findOne({
    username: req.body.userDeveloper,
  });
  newTask.userTester = await User.findOne({
    username: req.body.userTester,
  });
  newTask.userDeveloper2 = await User.findOne({
    username: req.body.userDeveloper2,
  });
  newTask.userTester2 = await User.findOne({
    username: req.body.userTester2,
  });
  newTask.userId = dbUser;

  newTask
    .save()
    .then(() =>
      newTask.populate([
        "userTester",
        "userDeveloper",
        "userTester2",
        "userDeveloper2",
      ])
    )
    .then((populated) => res.status(200).send(populated))
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

router.delete("/", (req, res) => {
  Task.findOneAndDelete({
    _id: req.query._id,
  })
    .then((task) => {
      return res.status(200).json(task);
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
});

module.exports = router;
