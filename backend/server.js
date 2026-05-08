import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./confige/mongodb.js";
import connectCloudinary from "./confige/cloudinary.js";

import userRouter from "./routes/userRout.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from './routes/orderRoute.js';
import staffRouter from './routes/staffRoute.js'


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/staff", staffRouter);

// ሌሎች ሚድልዌሮች
app.use('/api/cart', cartRouter)

app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server AFTER database connects
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server start error:", error);
  }
};
startServer();
