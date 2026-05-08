import express from "express";
import {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderChapa, // ✅ Chapa ተጨምሯል
  verifyChapa, // ✅ Chapa ተጨምሯል
  userOrders,
  allOrders,
  updateStatus,
  verifyOTP
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ለአድሚን የሚሆኑ መንገዶች
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// ለክፍያ የሚሆኑ መንገዶች
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/chapa", authUser, placeOrderChapa); // ✅ Razorpay በ Chapa ተተክቷል

// ለደንበኛው የሚሆኑ መንገዶች
orderRouter.post("/userorders", authUser, userOrders);

// የክፍያ ማረጋገጫ (Verify)
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyChapa", authUser, verifyChapa); // ✅ Chapa Verify ተጨምሯል

// በ orderRoute.js ውስጥ ይሄን ጨምር
orderRouter.post('/verify-otp', verifyOTP);

export default orderRouter;
