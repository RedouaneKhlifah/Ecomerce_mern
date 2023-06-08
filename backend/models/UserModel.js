import mongoose from "mongoose";

const Userschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add your name"],
    },
    email: {
      type: String,
      required: [true, "please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add your password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", Userschema);
