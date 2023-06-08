import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please fill the name"],
    },
    description: {
      type: String,
      required: [true, "please fill the description"],
    },
    price: {
      type: Number,
      required: [true, "please fill the price"],
    },
    quantity: {
      type: Number,
      required: [true, "please fill the quantity"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
