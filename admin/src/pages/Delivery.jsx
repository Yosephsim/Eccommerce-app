import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Delivery = ({ token }) => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});

  const fetchDeliveryOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        // ሁኔታቸው 'shipped' ወይም 'out for delivery' የሆኑትን ብቻ መለየት
        const pending = response.data.orders.filter(
          (order) =>
            order.status.toLowerCase() === "shipped" ||
            order.status.toLowerCase() === "out for delivery" ||
            order.status.toLowerCase() === "order placed", // ለሙከራ እንዲመችህ ተጨምሯል
        );
        setDeliveryOrders(pending.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("መረጃ መጫን አልተቻለም");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (orderId, value) => {
    setOtpInputs((prev) => ({ ...prev, [orderId]: value }));
  };

  const verifyAndDeliver = async (orderId, correctOtp) => {
    const enteredOtp = otpInputs[orderId];

    if (!enteredOtp || enteredOtp.length !== 4) {
      toast.error("እባክዎ ባለ 4 ድጂት ኮዱን በትክክል ያስገቡ");
      return;
    }

    if (enteredOtp !== String(correctOtp)) {
      toast.error("የተሳሳተ ኮድ ነው! እባክዎ ደንበኛውን እንደገና ይጠይቁ።");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: "Delivered" },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success("ማረጋገጫው ተሳክቷል! እቃው ተረክቧል።");
        setOtpInputs((prev) => {
          const newState = { ...prev };
          delete newState[orderId];
          return newState;
        });
        fetchDeliveryOrders();
      }
    } catch (error) {
      toast.error("ማረጋገጥ አልተቻለም");
    }
  };

  useEffect(() => {
    fetchDeliveryOrders();
  }, [token]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-10 flex justify-between items-center border-b border-gray-200 mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
          Delivery <br />{" "}
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">
            Tasks Dashboard
          </span>
        </h2>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-blue-200">
          {deliveryOrders.length} ORDERS
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {deliveryOrders.length > 0 ? (
          deliveryOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>

              {/* Status and Date */}
              <div className="flex justify-between items-center mb-6">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {order.status}
                </span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Customer Profile */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">
                  {order.address.firstName} {order.address.lastName}
                </h3>
                <div className="flex items-start gap-1 text-slate-500">
                  <span className="text-blue-600 text-lg">📍</span>
                  <p className="text-sm font-medium leading-relaxed">
                    {order.address.street}, {order.address.city}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <a
                  href={`tel:${order.address.phone}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm active:scale-95 transition-all"
                >
                  📞 Call Now
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address.street + " " + order.address.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-slate-100 text-slate-700 py-4 rounded-2xl font-bold text-sm active:scale-95 transition-all"
                >
                  🗺️ View Map
                </a>
              </div>

              {/* Item Summary (Accordion Style) */}
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">
                  Package Contents
                </p>
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm py-1 font-bold text-slate-700"
                  >
                    <span>{item.name}</span>
                    <span className="text-blue-600">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Verification Section */}
              <div className="bg-blue-900 rounded-[2rem] p-6 text-white shadow-2xl shadow-blue-200">
                <label className="block text-center text-[10px] font-black text-blue-200 uppercase tracking-widest mb-4 italic">
                  Customer Verification Code
                </label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="0000"
                    maxLength="4"
                    pattern="\d*"
                    inputMode="numeric"
                    value={otpInputs[order._id] || ""}
                    className="w-full bg-white/10 border-2 border-white/20 text-center py-4 text-4xl font-black tracking-[15px] text-white rounded-2xl focus:bg-white focus:text-blue-900 focus:border-white outline-none transition-all placeholder:text-white/20"
                    onChange={(e) => handleOtpChange(order._id, e.target.value)}
                  />
                </div>
                <button
                  onClick={() => verifyAndDeliver(order._id, order.otp)}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Confirm & Deliver
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 px-10 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="text-5xl mb-4">🚚</div>
            <p className="text-slate-400 font-bold text-lg leading-tight">
              No active deliveries <br /> assigned to you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivery;
