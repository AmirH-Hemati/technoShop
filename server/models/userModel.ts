import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  phone: string;
  email?: string;
  name?: string;
  photo: string;
  nationalId?: string;
  role: "user" | "admin";
  verificationCode?: number;
  verificationCodeExpires?: Date;
  refreshToken?: string;
  refreshTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  createVerificationCode(): number;
}

const userSchema = new Schema<IUser>(
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
    nationalId: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verificationCode: String,
    verificationCodeExpires: Date,
    refreshToken: String,
    refreshTokenExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.createVerificationCode = function (): number {
  const verificationCode = crypto.randomInt(10123, 99879);
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = new Date(Date.now() + 2 * 60 * 1000);
  return verificationCode;
};

export default mongoose.model<IUser>("User", userSchema);