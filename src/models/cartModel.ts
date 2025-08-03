import { Schema, model, models } from "mongoose";

const cartSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    products: [
      {
        product_slug: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        version: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = models.carts || model("carts", cartSchema);

export default CartModel;
