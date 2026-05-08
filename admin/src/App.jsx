import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Order from "./pages/Orders";
import List from "./pages/List";
import Add from "./pages/Add";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delivery from "./pages/Delivery";
import AddStaff from "./pages/AddStaff";
import StaffVerify from "./pages/StaffVerify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  // ✅ ቁልፍ ማስተካከያ፡ ገጹ ሲነሳ በቀጥታ ከ LocalStorage እንዲያነብ ማድረግ
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  // ቶክን ወይም ሮል በሌላ ታብ ቢቀየር እንኳ ሲስተሙ እንዲያውቀው
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  }, [token, role]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <>
          <NavBar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar role={role} />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                {/* 🛡️ አድሚን ብቻ የሚያያቸው */}
                {role === "Admin" && (
                  <>
                    <Route path="/add" element={<Add token={token} />} />
                    <Route path="/list" element={<List token={token} />} />
                    <Route path="/orders" element={<Order token={token} />} />
                    <Route path="/staff" element={<AddStaff token={token} />} />
                  </>
                )}

                {/* ✅ ሰራተኛውም አድሚኑም የሚያዩት */}
                <Route
                  path="/delivery"
                  element={
                    <StaffVerify staffToken={token} backendUrl={backendUrl} />
                  }
                />

                <Route
                  path="/delivery"
                  element={
                    <StaffVerify staffToken={token} backendUrl={backendUrl} />
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
