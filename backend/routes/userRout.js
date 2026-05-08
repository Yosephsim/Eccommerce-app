import express from "express";
import { userRegister,userLogin,adminLogin,addStaff,getProfile, updateProfile } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// routes
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);
userRouter.post("/add-staff", adminAuth, addStaff);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile,
);


export default userRouter;