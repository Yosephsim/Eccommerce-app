import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ role }) => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        {/* --- ለአድሚን ብቻ የሚታዩ (Admin Only) --- */}
        {role === 'Admin' && (
          <>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-all" to="/add">
              <img className="w-5 h-5" src={assets.add_icon} alt="" />
              <p className="hidden md:block">Add Items</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-all" to="/list">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <p className="hidden md:block">List Items</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-all" to="/orders">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <p className="hidden md:block">Orders</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-all' to="/staff">
              <img className='w-5 h-5' src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Staff</p>
            </NavLink>
          </>
        )}

        {/* --- ለሁሉም ሰራተኞች (Worker, Delivery, Admin) የሚታይ --- */}
        {(role === 'Worker' || role === 'Delivery' || role === 'Admin') && (
          <NavLink
            className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-all'
            to="/delivery"
          >
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Verify Delivery</p>
          </NavLink>
        )}

      </div>
    </div>
  );
};

export default Sidebar;