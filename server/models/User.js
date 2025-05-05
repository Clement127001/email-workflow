const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailRegex } = require("../utils/common");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [emailRegex],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (userPassword) {
  const isPasswordMatched = await bcrypt.compare(userPassword, this.password);
  return isPasswordMatched;
};

module.exports = mongoose.model("User", userSchema);
