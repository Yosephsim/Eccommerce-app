import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [currentTab, setCurrentTab] = useState("Active");

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
        if (newStatus === "Delivered") {
          toast.success("ትዕዛዙ ደርሷል! ወደ History ተዛውሯል።");
        } else {
          toast.success("ሁኔታው ተቀይሯል");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const activeOrders = orders.filter(order => order.status !== "Delivered");
  const historyOrders = orders.filter(order => order.status === "Delivered");
  const displayOrders = currentTab === "Active" ? activeOrders : historyOrders;

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Orders...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-2xl font-bold text-gray-800">Order Management</h3>

        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => setCurrentTab("Active")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === "Active" ? "bg-white shadow-md text-black" : "text-gray-500 hover:text-black"}`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setCurrentTab("History")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === "History" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black"}`}
          >
            History ({historyOrders.length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayOrders.length > 0 ? (
          displayOrders.map((order, index) => (
            <div key={index} className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-center border border-gray-200 rounded-xl p-6 bg-white shadow-sm transition-all hover:shadow-md ${currentTab === 'History' ? 'opacity-80' : ''}`}>

              <div
                onClick={() => { setSelectedOrderItems(order.items); setShowModal(true); }}
                className="bg-gray-50 p-2 rounded-lg flex flex-col items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-100"
              >
                <img className="w-16 h-16 object-cover rounded-md" src={order.items[0].image[0]} alt="" onError={(e) => e.target.src = assets.parcel_icon} />
                {order.items.length > 1 && <span className="text-[10px] font-bold text-gray-500 mt-2">+{order.items.length - 1} more</span>}
              </div>

              <div>
                <p className="font-bold text-gray-900">{order.address.firstName} {order.address.lastName}</p>

                {/* ✅ Order ID እዚህ ጋር ተጨምሯል */}
                <p className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mt-1">
                  ID: {order._id}
                </p>

                <p className="text-xs text-gray-500 mt-1">{order.address.street}, {order.address.city}</p>
                <div className="mt-2 text-[11px] font-medium text-gray-400">Items: {order.items.map(i => i.name).join(", ").substring(0, 30)}...</div>
              </div>

              <div className="text-xs space-y-1 border-l pl-4">
                <p>Method: <span className="font-bold">{order.paymentMethod}</span></p>
                <p>Status: <span className={`px-2 rounded-full font-bold ${order.payment ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{order.payment ? "Paid" : "Pending"}</span></p>
                <p className="text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className="text-lg font-black text-gray-900 border-l lg:text-center">
                {currency}{order.amount.toLocaleString()}
              </div>

              <div className="flex flex-col gap-2">
                <select
                  disabled={currentTab === "History"}
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`p-2 font-semibold border rounded-lg text-sm ${order.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" : "bg-white"}`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing started">Packing started</option> {/* ✅ ስሙን አስተካክለነዋል */}
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
            <p className="text-gray-400 font-medium">No orders found in {currentTab} tab.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold">Items Details</h3>
              <button onClick={() => setShowModal(false)} className="text-3xl text-gray-400">&times;</button>
            </div>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {selectedOrderItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <img src={item.image[0]} className="w-12 h-12 object-cover rounded shadow-sm" alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="w-full mt-6 bg-black text-white py-3 rounded-xl font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;