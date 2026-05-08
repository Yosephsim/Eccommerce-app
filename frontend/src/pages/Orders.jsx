import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOrder, setActiveOrder] = useState(null); // ለ Modal ስራ ይውላል

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            const itemInfo = {
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              otp: order.otp,
            };
            allOrdersItem.push(itemInfo);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const filteredOrders = orderData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="pt-16 px-4 sm:px-10 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <Title text1="MY" text2="ORDERS" />
          <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2">
            View and track your previous purchases
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search your orders..."
            className="w-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 border border-gray-100 p-5 sm:p-8 bg-white hover:shadow-md transition-shadow duration-300 rounded-sm"
          >
            {/* LEFT: Product Info */}
            <div className="flex items-start gap-8 flex-1">
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="w-24 sm:w-28 object-cover rounded-sm border border-gray-50 shadow-sm"
              />

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight leading-tight uppercase">
                  {item.name}
                </h3>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <p className="text-xl font-bold text-black">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-gray-500">
                    Qty:{" "}
                    <span className="text-black font-medium">
                      {item.quantity}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Size:{" "}
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-black uppercase">
                      {item.size}
                    </span>
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-gray-400">
                    Order Date:{" "}
                    <span className="text-gray-700 ml-1">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-gray-400">
                    Payment Method:{" "}
                    <span className="text-gray-700 ml-1 font-semibold">
                      {item.paymentMethod}
                    </span>
                  </p>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dotted border-gray-200">
                    <p className="text-[11px] uppercase tracking-widest text-blue-900 font-black">
                      Verification OTP:
                    </p>
                    <span className="px-3 py-1 bg-blue-900 text-white text-xs font-black rounded-md shadow-sm">
                      {item.otp || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Status & Tracking */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-6 md:w-1/4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <span
                  className={`w-2 h-2 rounded-full ${item.status === "Delivered" ? "bg-green-500" : "bg-orange-400 animate-bounce"}`}
                ></span>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                  {item.status}
                </p>
              </div>

              {/* ✅ በተኑ አሁን አክቲቭ ትዕዛዙን ሴት ያደርጋል */}
              <button
                onClick={() => setActiveOrder(item)}
                className="border-2 border-black bg-white text-black px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- TRACK ORDER MODAL --- */}
      {activeOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setActiveOrder(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black text-xl transition-colors"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter text-slate-900">
              Track Order
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-8 font-bold">
              Product: {activeOrder.name}
            </p>

            <div className="space-y-8 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100 -z-10"></div>

              {[
                { label: "Order Placed", status: "Order Placed" },
                { label: "Processing", status: "Processing" },
                { label: "Shipped", status: "Shipped" },
                { label: "Out for Delivery", status: "Out for Delivery" },
                { label: "Delivered", status: "Delivered" },
              ].map((step, index) => {
                const statuses = [
                  "Order Placed",
                  "Processing",
                  "Shipped",
                  "Out for Delivery",
                  "Delivered",
                ];
                const currentIndex = statuses.indexOf(activeOrder.status);
                const isCompleted = index <= currentIndex;

                return (
                  <div key={index} className="flex items-center gap-6">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        isCompleted
                          ? "bg-black border-gray-100"
                          : "bg-white border-gray-50"
                      }`}
                    >
                      {isCompleted && (
                        <span className="text-white text-[10px]">✓</span>
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-[11px] font-black uppercase tracking-widest ${isCompleted ? "text-black" : "text-gray-300"}`}
                      >
                        {step.label}
                      </p>
                      {isCompleted && index === currentIndex && (
                        <p className="text-[9px] text-blue-600 font-bold uppercase mt-1 italic">
                          Current Status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveOrder(null)}
              className="w-full mt-10 bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
