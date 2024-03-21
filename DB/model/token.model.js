import mongoose, { Schema, Types, model } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "guardian",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    expiredAt: String
  },
  { timestamps: true }
);
const tokenModel = mongoose.model.token || model("Token", tokenSchema);
export default tokenModel;
