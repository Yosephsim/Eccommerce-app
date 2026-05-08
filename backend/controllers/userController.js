import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'; // 👈 ይህንን መስመር ጨምር

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//route for user Register
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // Validate password strength
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// አዲስ ሰራተኛ ለመጨመር (Admin Only)
const addStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; // role እዚህ ጋር "Delivery" ይሆናል

        // ተጠቃሚው ቀድሞ መኖሩን ቼክ አድርግ
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "ይህ ኢሜይል ቀድሞ ተመዝግቧል" });
        }

        // ፓስወርድ ሀሽ (Hash) ማድረግ
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStaff = new userModel({
            name,
            email,
            password: hashedPassword,
            role: role || "Delivery" // ካልተመረጠ በዲፎልት ደሊቨሪ ይሆናል
        });

        const user = await newStaff.save();
        res.json({ success: true, message: "ሰራተኛው በተሳካ ሁኔታ ተጨምሯል" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. መጀመሪያ ዋናውን አድሚን ቼክ እናደርጋለን
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token, role: "Admin" });
    }

    // 2. አድሚን ካልሆነ፣ በዳታቤዝ ውስጥ ሰራተኛ መሆኑን እንፈልጋለን
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "ተጠቃሚው አልተገኘም" });
    }

    // 3. ተጠቃሚው ተገኝቷል፣ አሁን ሚናው (Role) "Delivery" መሆኑን እናረጋግጥ
    if (user.role === "Delivery") {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // ለሰራተኛው ቶክን እንሰራለን
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token, role: "Delivery" });
      } else {
        return res.json({ success: false, message: "የተሳሳተ የይለፍ ቃል" });
      }
    }

    // 4. ሚናው ሰራተኛ ካልሆነ (ለምሳሌ ተራ ገዢ/User ከሆነ)
    res.json({ success: false, message: "ወደዚህ ገጽ ለመግባት ስልጣን የሎትም" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// backend/controllers/userController.js

// backend/controllers/userController.js

// 🔵 ፕሮፋይል ለማንበብ (GET)
const getProfile = async (req, res) => {
    try {
        const userId = req.userId; // ✅ ከ auth.js የመጣው
        const userData = await userModel.findById(userId).select("-password");

        if (!userData) {
            return res.json({ success: false, message: "ተጠቃሚው አልተገኘም" });
        }
        res.json({ success: true, userData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// 🟢 ፕሮፋይል ለማደስ (POST)
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; // ✅ ከ auth.js የመጣው
        const { name, phone, address } = req.body;
        const imageFile = req.file;

        if (!name || !phone) {
            return res.json({ success: false, message: "ስም እና ስልክ ቁጥር ያስፈልጋል" });
        }

        const updateData = { name, phone };

        if (address) {
            try {
                updateData.address = JSON.parse(address);
            } catch (e) {
                updateData.address = {};
            }
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        // ዳታቤዙን አድስ
        const result = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!result) {
            return res.json({ success: false, message: "ተጠቃሚው አልተገኘም" });
        }

        res.json({ success: true, message: "ፕሮፋይልዎ በትክክል ታድሷል" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// እነዚህን ኤክስፖርት ማድረግ እንዳትረሳ
export { userLogin, userRegister, adminLogin, addStaff, getProfile, updateProfile };


