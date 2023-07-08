const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  id: String,
  name: String,
  projectName: String,
  frontend: String,
  backend: String,
  database: String,
  description: String,
});

module.exports = mongoose.model("project", projectSchema);
