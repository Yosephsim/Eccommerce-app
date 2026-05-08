import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js"; // ትዕዛዞችን ለመፈተሽ
// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: sizes ? JSON.parse(sizes) : [],
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new ProductModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ADD REVIEW (ለብቻው ወጥቷል)


const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;
    const userName = req.userName;

    // 1. ተጠቃሚው ይሄን ምርት ገዝቶ እንደሆነ እና ክፍያ መፈጸሙን ቼክ እናድርግ
    const hasPurchased = await orderModel.findOne({
      userId,
      payment: true, // ክፍያ የተፈጸመባቸው ብቻ
      "items._id": productId, // በዕቃዎቹ ዝርዝር ውስጥ ይሄ ምርት ካለ
    });

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const newReview = {
      userId,
      userName,
      rating: Number(rating),
      comment,
      verified: hasPurchased ? true : false, // ገዝቶ ከሆነ Verified ይሆናል
      date: Date.now(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.json({ success: true, message: "Review added successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ሌሎች ፋንክሽኖች...
const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.id);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// addReview እዚህ export ውስጥ መጨመሩን እንዳትረሳ
export { addProduct, listProducts, removeProduct, singleProduct, addReview };
