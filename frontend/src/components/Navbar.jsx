import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8 font-medium">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative p-[1.5px] bg-white border border-gray-100 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
            <img
              src={assets.logo}
              className="w-14 h-14 object-cover rounded-full"
              alt="Brand Logo"
            />
            <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-700">
          {["Home", "Collection", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="group flex flex-col items-center gap-1"
            >
              <p className="hover:text-black transition-colors">{item}</p>
              <hr className="w-0 group-hover:w-full border-none h-[2px] bg-black transition-all duration-300" />
            </NavLink>
          ))}
        </nav>

        {/* Icons Section */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button onClick={() => setShowSearch(true)} className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <img src={assets.search_icon} className="w-5" alt="search" />
          </button>

          <div className="group relative">
            <button onClick={() => (!token ? navigate("/login") : null)} className="p-1 hover:bg-gray-100 rounded-full transition-all">
              <img src={assets.profile_icon} className="w-5" alt="profile" />
            </button>
            {token && (
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block transition-all duration-300">
                <div className="flex flex-col gap-1 w-44 p-2 bg-white border border-gray-100 shadow-xl rounded-lg text-sm text-gray-600">
                  <p onClick={() => navigate("/my-profile")} className="px-4 py-2 hover:bg-gray-50 hover:text-black cursor-pointer rounded">My Profile</p>
                  <p onClick={() => navigate("/orders")} className="px-4 py-2 hover:bg-gray-50 hover:text-black cursor-pointer rounded">Orders</p>
                  <hr className="my-1 border-gray-100" />
                  <p onClick={logout} className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer rounded">Logout</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative p-1 hover:bg-gray-100 rounded-full transition-all">
            <img src={assets.cart_icon} className="w-5" alt="cart" />
            {getCartCount() > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button onClick={() => setVisible(true)} className="md:hidden p-1 active:scale-95 transition-transform">
            <img src={assets.menu_icon} className="w-6" alt="menu" />
          </button>
        </div>

        {/* --- Mobile Sidebar --- */}
        {/* Overlay background */}
        <div
          className={`fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300 md:hidden ${visible ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setVisible(false)}
        ></div>

        {/* Sidebar content */}
        <div className={`fixed top-0 right-0 bottom-0 z-[100] w-full max-w-xs bg-white transition-transform duration-500 ease-in-out md:hidden ${visible ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full text-gray-600 shadow-2xl bg-white">

            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div onClick={() => setVisible(false)} className="flex items-center gap-3 cursor-pointer group">
                <img src={assets.back_icon} className="h-4 rotate-180" alt="back" />
                <p className="text-sm font-medium uppercase tracking-[2px] text-black">Close Menu</p>
              </div>
            </div>

            {/* Navigation Links inside Sidebar */}
            <div className="flex flex-col mt-4 bg-white">
              {["Home", "Collection", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `py-5 px-10 text-lg font-light border-b border-gray-50 transition-all duration-300 uppercase tracking-[3px] ${isActive ? "text-black bg-gray-50 font-normal pl-14" : "hover:pl-12 hover:bg-gray-50"}`
                  }
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item}
                </NavLink>
              ))}
            </div>

            {/* Footer Brand Branding */}
            <div className="mt-auto p-10 text-center border-t border-gray-50">
              <p className="text-[10px] tracking-[5px] text-gray-400 uppercase">© 2026 Yoseph Boutique</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;