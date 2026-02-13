const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "شماره تلفن الزامی است"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: "default.png",
    },

    photoPublicId: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    verificationCode: String,
    verificationCodeExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.createVerificationCode = function () {
  const verificationCode = crypto.randomInt(10123, 99879);
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = Date.now() + 2 * 60 * 1000;

  return verificationCode;
};
module.exports = mongoose.model("User", userSchema);
