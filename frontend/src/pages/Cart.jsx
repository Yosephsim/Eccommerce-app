import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <div className="text-2xl font-bold mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 grid grid-cols-[4fr_1fr] sm:grid-cols-[4fr_2fr] items-center gap-4 flex items-center gap-3"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image?.[0]}
                  alt={productData.name}
                />

                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-4 mt-1">
                    <p className="font-semibold">
                      {currency}{productData.price}
                    </p>
                    <span className="px-2 sm:px-3 py-1 border bg-slate-50 text-sm">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: quantity + bin icon (same row) */}
  <div className="flex items-center gap-9 sm:gap-20 ">
    <input
  type="number"
  min={1}
  value={item.quantity}
  onChange={(e) => {
    const value = Number(e.target.value);
    if (!value || value < 1) return;
    updateQuantity(item._id, item.size, value);
  }}
  className="border w-12 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
/>

    <img onClick={()=>updateQuantity(item._id, item.size,0)}
      src={assets.bin_icon}
      alt="Remove item"
      className="w-4 sm:w-5 cursor-pointer"
    />
  </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-ful sm:w-[450px]">
         <CartTotal />
         <div className="w-full text-end">
          <button onClick={()=>navigate('/place-order')} className="w-48 h-10 bg-black text-white mt-4">Proceed to Checkout</button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
