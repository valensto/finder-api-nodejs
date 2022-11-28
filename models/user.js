const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  firstname: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "speaker", "pilot", "administration", "support"],
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  is_confirmed: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;