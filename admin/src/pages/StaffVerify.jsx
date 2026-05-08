import React, { useState, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";

const StaffVerify = ({ staffToken, backendUrl }) => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});
  const [showScanner, setShowScanner] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null); // ለየትኛው ኦርደር ስካን እየተደረገ እንደሆነ ለማወቅ

  // ✅ የተመደቡ ኦርደሮችን መጫን
  const fetchDeliveryOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token: staffToken } },
      );

      if (response.data.success) {
        // 'shipped' ወይም 'out for delivery' የሆኑትን ብቻ መለየት
        const pending = response.data.orders.filter(
          (order) =>
            order.status.toLowerCase() === "shipped" ||
            order.status.toLowerCase() === "out for delivery" ||
            order.status.toLowerCase() === "order placed",
        );
        setDeliveryOrders(pending.reverse());
      }
    } catch (error) {
      toast.error("መረጃ መጫን አልተቻለም");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryOrders();
  }, [staffToken]);

  // ✅ QR ስካነር ሎጂክ
  useEffect(() => {
    let scanner;
    if (showScanner) {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          // ስካን የተደረገው text Order ID ከሆነ ለዛ ኦርደር input ላይ ይሞላል
          if (activeOrderId) {
            handleOtpChange(activeOrderId, decodedText);
          }
          setShowScanner(false);
          scanner.clear();
          toast.success("QR Code ተነቧል!");
        },
        () => {},
      );
    }
    return () => {
      if (scanner) scanner.clear();
    };
  }, [showScanner]);

  const handleOtpChange = (orderId, value) => {
    setOtpInputs((prev) => ({ ...prev, [orderId]: value }));
  };

  // ✅ ማረጋገጫ (Verify & Deliver)
  const verifyAndDeliver = async (orderId) => {
    const enteredOtp = otpInputs[orderId];

    if (!enteredOtp || enteredOtp.length < 4) {
      toast.error("እባክዎ ትክክለኛ ኮድ ያስገቡ");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/verify-otp",
        { orderId, otp: enteredOtp },
        { headers: { token: staffToken } },
      );

      if (response.data.success) {
        toast.success("ትዕዛዙ በተሳካ ሁኔታ ደርሷል!");
        setOtpInputs((prev) => {
          const newState = { ...prev };
          delete newState[orderId];
          return newState;
        });
        fetchDeliveryOrders(); // ዝርዝሩን ማደስ
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("ማረጋገጥ አልተቻለም: " + error.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans">
      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-5">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md">
            <div id="reader"></div>
            <button
              onClick={() => setShowScanner(false)}
              className="w-full py-4 bg-gray-100 text-red-600 font-bold"
            >
              ዝጋ
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-10 flex justify-between items-center border-b mb-6">
        <h2 className="text-2xl font-black text-slate-900 leading-none">
          Delivery <br />{" "}
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">
            Tasks Dashboard
          </span>
        </h2>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg">
          {deliveryOrders.length} ORDERS
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {deliveryOrders.length > 0 ? (
          deliveryOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {order.status}
                </span>
                <p className="text-[10px] font-bold text-slate-400">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-black text-slate-900">
                  {order.address.firstName} {order.address.lastName}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  📍 {order.address.street}, {order.address.city}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <a
                  href={`tel:${order.address.phone}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs"
                >
                  📞 Call
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address.street + " " + order.address.city)}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs"
                >
                  🗺️ Map
                </a>
              </div>

              {/* Verification Section */}
              <div className="bg-blue-900 rounded-[2rem] p-5 text-white">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-black text-blue-200 uppercase tracking-widest italic">
                    Verification Code
                  </label>
                  <button
                    onClick={() => {
                      setActiveOrderId(order._id);
                      setShowScanner(true);
                    }}
                    className="text-[10px] bg-blue-500 px-2 py-1 rounded-lg font-bold"
                  >
                    📷 Scan QR
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="0000"
                  maxLength="4"
                  value={otpInputs[order._id] || ""}
                  onChange={(e) => handleOtpChange(order._id, e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 text-center py-3 text-3xl font-black text-white rounded-xl focus:bg-white focus:text-blue-900 outline-none transition-all mb-3"
                />
                <button
                  onClick={() => verifyAndDeliver(order._id)}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Confirm & Deliver
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold">
              No active deliveries assigned.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffVerify;
