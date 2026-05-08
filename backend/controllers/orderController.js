import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";
import nodemailer from "nodemailer";

// የኢሜይል መላኪያ ፈንክሽን
// የኢሜይል መላኪያ ፈንክሽን (የተስተካከለ)
const sendEmailNotification = async (userEmail, userName, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail, // 👈 እዚህ ጋር 'userEmail' መሆን አለበት
    subject: `ትዕዛዝዎ መታሸግ ጀምሯል! - OTP: ${otp}`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>ሰላም ${userName}፣</h2> 
            <p>ትዕዛዝዎ አሁን <b>መታሸግ (Packing)</b> ጀምሯል። እቃው ተረክበው እስኪያረጋግጡ ድረስ ይህንን የጥበቃ ኮድ (OTP) በጥንቃቄ ይያዙ።</p>
            <h1 style="color: #000; background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
            <p>እቃው ለዴሊቨሪ ሰራተኛው ሲሰጥ እና እርስዎ ጋር ሲደርስ ይህንን ኮድ በመስጠት ትዕዛዙን ያጠናቅቃሉ።</p>
            <p>ስላዘዙ እናመሰግናለን!</p>
        </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", userEmail);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

const currency = "Birr";
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// --- 1. CASH ON DELIVERY ---
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      otp: otp,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// --- 2. CHAPA PAYMENT ---
const placeOrderChapa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const user = await userModel.findById(userId);
    const userEmail = user?.email || address.email;

    if (!userEmail) {
      return res.json({ success: false, message: "Email is required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Chapa",
      payment: false,
      date: Date.now(),
      otp: otp,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const textRef = `TXN-${Date.now()}-${newOrder._id}`;

    const chapaRequestData = {
      amount: amount.toString(),
      currency: "ETB",
      email: userEmail,
      first_name: address.firstName,
      last_name: address.lastName,
      tx_ref: textRef,
      return_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    };

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      chapaRequestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY.trim()}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data && response.data.status === "success") {
      res.json({
        success: true,
        checkout_url: response.data.data.checkout_url,
      });
    } else {
      res.json({ success: false, message: "Chapa failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyChapa = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Verified" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// --- 3. STRIPE PAYMENT ---
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      otp: otp,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Confirmed" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// --- 4. DATA FETCHING ---
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // --- ይሄንን ቼክ ለማድረግ እንጠቀም ---
    console.log("-----------------------------------------");
    console.log("1. Admin sent status:", status);

    const order = await orderModel.findById(orderId);
    if (!order) {
      console.log("2. Order NOT found in Database!");
      return res.json({ success: false, message: "Order not found" });
    }

    console.log("3. Target Email:", order.address.email);
    console.log("4. Target OTP:", order.otp);

    await orderModel.findByIdAndUpdate(orderId, { status });

    // ለደህንነት ሲባል የፊደል ልዩነትን (Case sensitivity) እናስወግድ
    // updateStatus ውስጥ ያለውን if እንዲህ ቀይረው
    if (
      status.toLowerCase().trim() === "packing started" ||
      status.toLowerCase().trim() === "packing"
    ) {
      console.log("5. Match found! Status is: Packing started");

      // ለደንበኛው ኢሜይል መላክ
      sendEmailNotification(
        order.address.email,
        order.address.firstName,
        order.otp,
      );
    } else {
      console.log("5. Match NOT found. Status was:", status);
    }
    console.log("-----------------------------------------");

    res.json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    console.log("ERROR OCCURRED:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// --- 6. VERIFY OTP (ለዴሊቨሪ ሰራተኛው) ---
const verifyOTP = async (req, res) => {
    try {
        const { orderId, otp } = req.body;

        // ትዕዛዙን በ ID እንፈልጋለን
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: "ትዕዛዙ አልተገኘም!" });
        }

        // የተላከው OTP ከዳታቤዙ ጋር ይገጥማል?
        if (order.otp === otp) {
            // ትክክል ከሆነ ስታተሱን ወደ 'Delivered' እንቀይራለን፣ ክፍያውንም 'true' እናደርጋለን
            await orderModel.findByIdAndUpdate(orderId, { 
                status: 'Delivered', 
                payment: true 
            });

            res.json({ success: true, message: "ኮዱ ትክክል ነው! ትዕዛዙ ተዘግቷል።" });
        } else {
            // ኮዱ ካልገጠመ
            res.json({ success: false, message: "የተሳሳተ ኮድ ነው! እባክዎ ደንበኛውን በድጋሚ ይጠይቁ።" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// ✅ የመጨረሻው እና ብቸኛው ኤክስፖርት
export {
  placeOrder,
  placeOrderStripe,
  placeOrderChapa,
  allOrders,
  userOrders,
  updateStatus,
  verifyChapa,
  verifyStripe,
  verifyOTP,
};
