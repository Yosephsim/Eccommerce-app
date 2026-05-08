import express from "express";
// እዚህ ጋር addReview መጨመር አለበት
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  addReview,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const productRouter = express.Router();

// Add product
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

// Remove product
productRouter.post("/remove", adminAuth, removeProduct);

// List products
productRouter.get("/list", listProducts);

// Single product
productRouter.post("/single", singleProduct);

// Review product (አሁን ይሰራል)
productRouter.post("/review", authUser, addReview);

export default productRouter;
