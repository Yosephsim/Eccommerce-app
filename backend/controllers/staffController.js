import staffModel from "../models/staffModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// 1. ሰራተኛ ለመመዝገብ (በአድሚን ብቻ የሚከናወን)
const addStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ኢሜይሉ ትክክል መሆኑን ማረጋገጥ
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ" });
    }

    // የፓስወርድ ጥንካሬ (ቢያንስ 8 ፊደል)
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "ፓስወርድ ቢያንስ 8 ፊደላት መሆን አለበት",
      });
    }

    // ኢሜይሉ ቀድሞ መኖሩን ማረጋገጥ
    const exists = await staffModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "ይህ ሰራተኛ ቀድሞ ተመዝግቧል" });
    }

    // ፓስወርዱን ሀሽ (Hash) ማድረግ
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = new staffModel({
      name,
      email,
      password: hashedPassword,
    });

    const staff = await newStaff.save();
    res.json({ success: true, message: "ሰራተኛው በተሳካ ሁኔታ ተመዝግቧል" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 2. የሰራተኛ ሎጊን (Staff Login)
// backend/controllers/staffController.js ውስጥ ያለውን loginStaff እንዲህ አሻሽለው፡

const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. ለአድሚን ቼክ አድርግ (ከ .env)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token, role: 'Admin', name: 'Admin User' });
        }

        // 2. ለሰራተኛ ቼክ አድርግ
        const staff = await staffModel.findOne({ email });
        if (staff) {
            const isMatch = await bcrypt.compare(password, staff.password);
            if (isMatch) {
                const token = jwt.sign({ id: staff._id, role: 'Delivery' }, process.env.JWT_SECRET);
                return res.json({ success: true, token, role: 'Delivery', name: staff.name });
            }
        }

        res.json({ success: false, message: "ኢሜይል ወይም ፓስወርድ ተሳስቷል" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//ሁሉንም ሰራተኞች ዝርዝር ለማየት (ለአድሚን)
const listStaff = async (req, res) => {
  try {
    const staffList = await staffModel.find({}).select("-password"); // ፓስወርዱን ሳይጨምር
    res.json({ success: true, staffList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addStaff, loginStaff, listStaff };
