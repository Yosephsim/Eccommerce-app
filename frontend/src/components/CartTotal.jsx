import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } =
    useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full sm:w-96 bg-gray-100 p-4 flex flex-col gap-4">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>

        <hr />

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>{currency} {total}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
