const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  age: { type: Number },
});

module.exports = mongoose.model("users", userSchema);
