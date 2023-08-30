import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const cartsModel = mongoose.model("carts", cartsSchema);
