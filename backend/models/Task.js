const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String, //bug, change, new feature, other
    required: true,
    default: "new feature",
  },
  priority: {
    type: String, //1,2,3,4,5
    required: true,
    default: "1",
  },
  status: {
    type: String,
    required: true,
    default: "todo",
  },
  userDeveloper: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  userTester: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  userDeveloper2: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  userTester2: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});
module.exports = Task = mongoose.model("tasks", TaskSchema);
