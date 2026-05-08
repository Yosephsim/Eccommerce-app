import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-600 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-16">

          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src={assets.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-bold text-black tracking-[0.2em] text-lg uppercase">BY YOSEPH</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted platform for premium quality products and fast delivery.
              Experience international fashion with a local touch.
            </p>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">Company</h3>
            <ul className="flex flex-col gap-3 text-sm tracking-wide">
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Home</li>
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">About</li>
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Delivery</li>
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Privacy Policy</li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">Support</h3>
            <ul className="flex flex-col gap-3 text-sm tracking-wide">
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Help Center</li>
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Returns</li>
              <li className="hover:text-black cursor-pointer transition-colors underline-offset-4 hover:underline">Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">Get in Touch</h3>
            <div className="flex flex-col gap-4 text-sm tracking-wide text-gray-500">
              <div className="flex items-center gap-3 group cursor-pointer">
                <span className="p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-all">📞</span>
                <p className="group-hover:text-black">+251 944 253604</p>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <span className="p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-all">✉️</span>
                <p className="group-hover:text-black">yossupport@ecommerceapp.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-gray-50 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            © 2026 E-commerce App. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
            <span className="hover:text-black cursor-pointer">Instagram</span>
            <span className="hover:text-black cursor-pointer">Facebook</span>
            <span className="hover:text-black cursor-pointer">Telegram</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer