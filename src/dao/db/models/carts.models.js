import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const cartsModel = mongoose.model("carts", cartsSchema);
