import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location, showSearch])

  if (!visible) return null;

  return (
    <div className="bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-[72px] z-40 transition-all duration-500">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-10">
        <div className="flex items-center justify-between gap-8">

          {/* 🔍 Input Area */}
          <div className="flex-1 flex items-center border-b border-black/5 focus-within:border-black transition-all duration-300 pb-2">
            <img src={assets.search_icon} className="w-4 opacity-30" alt="search" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none px-4 text-sm sm:text-base tracking-widest placeholder:text-gray-300 placeholder:uppercase placeholder:text-[10px]"
              type="text"
              placeholder="Search for items..."
              autoFocus
            />
          </div>

          {/* ❌ Close Icon (The Added Part) */}
          <div className="flex items-center">
            <img
              onClick={() => setShowSearch(false)}
              src={assets.cross_icon || assets.close_icon} // በአሴትስህ ውስጥ ባለው ስም ተጠቀመው
              className="w-3 cursor-pointer opacity-40 hover:opacity-100 hover:rotate-90 transition-all duration-300 ease-in-out"
              alt="close search"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default SearchBar