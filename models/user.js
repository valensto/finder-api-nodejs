const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");
const { sendValidationEmail } = require("../utils/mailer");


const userSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enought");
        }
      },
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const payload = {
    id: this.id,
    email: this.email,
    fullname: this.firstname + " " + this.lastname,
    role: this.role,
  };

  return createToken(payload, 60 * 60);
};

userSchema.methods.sendValidationEmail = async function () {
  let token = createToken(
    { email: this.email },
    60 * 30,
    process.env.JWT_SECRET_ACTIVE
  );

  sendValidationEmail(this.email, token);
};

userSchema.statics.activeWithToken = async (token) => {
  const { email } = jwt.verify(token, process.env.JWT_SECRET_ACTIVE);
  await User.findOneAndUpdate({ email: email }, { is_confirmed: true });
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user not found");
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    throw new Error("password does not match");
  }

  return user;
};

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
