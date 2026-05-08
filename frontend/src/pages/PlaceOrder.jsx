import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        return toast.error("Your cart is empty!");
      }

      // Backend የሚጠብቀው የዳታ ቅርጽ
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order Placed Successfully!");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "chapa":
          // Chapa ክፍያ ከመጀመሩ በፊት አስፈላጊ መረጃዎች መኖራቸውን ማረጋገጥ
          const responseChapa = await axios.post(
            backendUrl + "/api/order/chapa",
            orderData,
            { headers: { token } }
          );

          if (responseChapa.data.success) {
            // ተጠቃሚውን ወደ Chapa የክፍያ ገጽ ይወስደዋል
            window.location.href = responseChapa.data.checkout_url;
          } else {
            toast.error(responseChapa.data.message || "Chapa failed to initialize");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Order Submission Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-10 pt-10 border-t sm:pt-20 min-h-[80vh]"
    >
      {/* ግራ በኩል: አድራሻ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="Delivery" text2="Information" />
        </div>
        <div className="flex gap-4">
          <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} placeholder="First Name" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
          <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} placeholder="Last Name" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={formData.email} placeholder="Email Address" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" type="email" />
        <input required name="street" onChange={onChangeHandler} value={formData.street} placeholder="Street" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
        <div className="flex gap-4">
          <input required name="city" onChange={onChangeHandler} value={formData.city} placeholder="City" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
          <input required name="state" onChange={onChangeHandler} value={formData.state} placeholder="State" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
        </div>
        <div className="flex gap-4">
          <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} placeholder="Zipcode" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" type="number" />
          <input required name="country" onChange={onChangeHandler} value={formData.country} placeholder="Country" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={formData.phone} placeholder="Phone" className="border border-gray-300 py-1.5 px-3.5 w-full rounded outline-none focus:border-black" type="number" />
      </div>

      {/* ቀኝ በኩል: ሂሳብ እና ክፍያ */}
      <div className="w-full sm:max-w-[420px] mt-10 sm:mt-0">
        <CartTotal />
        <div className="mt-12">
          <Title text1="Payment" text2="Method" />
          <div className="flex flex-col gap-4 mt-4 lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:bg-gray-50 transition-all">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-500" : ""}`}></p>
              <img src={assets.stripe_logo} alt="Stripe" className="h-5 mx-2" />
            </div>

            <div onClick={() => setMethod("chapa")} className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:bg-gray-50 transition-all">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "chapa" ? "bg-green-500" : ""}`}></p>
              <p className="text-blue-600 text-sm font-bold mx-2">CHAPA</p>
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:bg-gray-50 transition-all">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-2 uppercase">Cash on Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm rounded active:bg-gray-700 hover:opacity-90 transition-all uppercase tracking-widest">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;