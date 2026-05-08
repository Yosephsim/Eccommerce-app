import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js"; // ይህ ተጠቃሚው Login ማድረጉን ያረጋግጣል

const cartRouter = express.Router();

// የደንበኛውን የቅርጫት መረጃ ለማግኘት
cartRouter.post("/get", authUser, getUserCart);

// አዲስ ምርት ወደ ቅርጫት ለመጨመር
cartRouter.post("/add", authUser, addToCart);

// በቅርጫት ውስጥ ያለን ምርት ብዛት ለመቀየር (Update)
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
