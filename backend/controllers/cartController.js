import userModel from "../models/userModel.js";

// ምርትን ወደ ደንበኛው ቅርጫት ለመጨመር
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    // 💡 ተጠቃሚው ካልተገኘ ቀድሞ እንዲቆም ማድረግ
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    let cartData = (await userData.cartData) || {}; // ካርቱ ባዶ ከሆነ ባዶ Object እንዲሆን

    if (!cartData[itemId]) {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    } else {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// የደንበኛውን ቅርጫት ለማዘመን (Quantity update)
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData;

    // 💡 ስህተት እንዳይፈጠር መጀመሪያ itemId እና size መኖራቸውን ማረጋገጥ
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// የደንበኛውን ቅርጫት ዳታ ለማምጣት
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = (await userData.cartData) || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
