const mongoose = require("mongoose");

const usarsSchema = new mongoose.Schema({
  url: { type: String },
  type: String,
  name: String,
  email: String,
  password: String,
  roles: [{ type: String }],
});

module.exports = mongoose.model("users", usarsSchema);

// const mongoose = require("mongoose");
// const usarsSchema = new mongoose.Schema({
//   name: { type: String, require: true },
//   email: {
//     type: String,
//     unique: true,
//     validate: {
//       validate: function (v) {
//         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/.test(v);
//       },
//       message: (props) => `${props.value}is not a valid Email`,
//     },
//     required: true,
//   },
//   password: { type: String, minlength: 6, required: true },
//   token: String,
// });

// module.exports = mongoose.model("users", usarsSchema);
