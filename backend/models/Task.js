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
  status: {
    type: String,
    required: true,
    default: "todo",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});
module.exports = Task = mongoose.model("tasks", TaskSchema);
