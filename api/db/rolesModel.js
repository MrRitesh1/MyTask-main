const mongoose = require("mongoose");
const rolesSchema = new mongoose.Schema({
  roles: String,
  permissions: [{ type: String }],
});

module.exports = mongoose.model("roles", rolesSchema);
