import express from "express";
import {
  addStaff,
  loginStaff,
  listStaff,
} from "../controllers/staffController.js";
import adminAuth from "../middleware/adminAuth.js";

const staffRouter = express.Router();

// ✅ ሰራተኛ መመዝገብ የሚችለው አድሚን ብቻ ነው (adminAuth ያስፈልጋል)
staffRouter.post("/add", adminAuth, addStaff);

// ✅ ሰራተኛው ሎጊን የሚያደርግበት (ማንም መሞከር ይችላል)
staffRouter.post("/login", loginStaff);

// ✅ የሰራተኞችን ዝርዝር ማየት (ለአድሚን ብቻ)
staffRouter.get("/list", adminAuth, listStaff);

export default staffRouter;
