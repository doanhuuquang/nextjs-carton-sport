import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birth_of_date: {
      type: Schema.Types.Date,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    created_at: {
      type: Schema.Types.Date,
      required: true,
    },
    update_at: {
      type: Schema.Types.Date,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = models.users || model("users", userSchema);

export default UserModel;
