import mongoose from "mongoose";

// የትዕዛዝ መረጃዎች ምን ምን መያዝ እንዳለባቸው የሚወስን መመሪያ (Schema)
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },

  // --- አዲስ የተጨመረ፡ የዴሊቨሪ ማረጋገጫ ኮድ (OTP) ---
  // ደንበኛው እቃውን ሲረከብ ለዴሊቨሪ ሰራተኛው የሚሰጠው 4 ድጂት ቁጥር እዚህ ይቀመጣል
  otp: { type: String, required: true },
});

// ሞዴሉ ቀድሞ ካለ እሱን ይጠቀማል፣ ከሌለ ግን አዲስ ይፈጥራል
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
