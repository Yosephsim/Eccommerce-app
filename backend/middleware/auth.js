// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "በመጀመሪያ ይግቡ" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ዳታውን እዚህ ላይ ብቻ አስቀምጠው
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "የማረጋገጫ ስህተት" });
  }
};

export default authUser;
