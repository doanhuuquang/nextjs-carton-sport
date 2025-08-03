import { Schema, model, models } from "mongoose";

const addressSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address_line_1: {
      type: String,
      required: true,
    },
    address_line_2: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    created_at: {
      type: Schema.Types.Date,
      required: true,
    },
    deleted_at: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  { timestamps: true }
);

const AddressModel = models.addresses || model("addresses", addressSchema);

export default AddressModel;
