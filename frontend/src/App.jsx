import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/product.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Collection from "./pages/Collection.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Success from "./pages/Success.jsx";
import VerifyOrder from './pages/VerifyOrder';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from './pages/MyProfile.jsx'

const App = () => {

  // የባክኢንድ አድራሻ
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  return (
    <div className="px-4 sm:px-[5vw] md:px-[5vw] lg:px-[7vw] 2xl:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        {/* እዚህ ጋር token={token} የሚለውን አጥፍተነዋል ምክንያቱም ስህተት ስለሚፈጥር */}
        <Route path='/my-profile' element={<MyProfile backendUrl={backendUrl} />} />
        <Route path='/success' element={<Success />} />
        <Route path='/delivery-verify' element={<VerifyOrder url={backendUrl} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;