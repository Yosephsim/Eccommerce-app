import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const adminAuth = (req, res, next) => {
    try {
    const {token} = req.headers
    if (!token) {
        return res.json({ success: false, message: "No Authorization please login again" });
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Unauthorized login Again" });
    }
    next();
    }
    catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }   
};
export default adminAuth;