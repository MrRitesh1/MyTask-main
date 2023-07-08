const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  task: String,
  name: String,
  deta: String,
  project_name: String,
  // task_name: String,
  description: String,
  time: String,
  reporting: String,
  userId: String,
});

module.exports = mongoose.model("tasks", taskSchema);
