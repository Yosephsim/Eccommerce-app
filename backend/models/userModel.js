import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // 🔴 እነዚህን ሁለት መስመሮች የግድ መጨመር አለብህ
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "Not set",
    },
    // 🔴 አድራሻ እንዲቀመጥ ይህንንም ጨምር
    address: {
      type: Object,
      default: { street: "", city: "", state: "", zipcode: "" },
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false,
    timestamps: true,
  },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
