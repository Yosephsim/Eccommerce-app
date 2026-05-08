import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox.jsx";

const Contact = () => {
  return (
    <div className="pt-10 border-t">
      <div className="text-center text-2xl mb-12">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2">
          We're here to help you with your fashion journey
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-16 mb-28 px-4">
        {/* LEFT: Branding/Store Image (Optional - Adds International feel) */}
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px] rounded-sm object-cover shadow-sm"
          alt="Our Office"
        />

        {/* RIGHT: Contact Details */}
        <div className="flex flex-col justify-center items-start gap-8">
          <div className="space-y-3">
            <p className="font-bold text-xl text-gray-800 tracking-tight uppercase">
              Our Global Headquarters
            </p>
            <p className="text-gray-500 leading-relaxed">
              54709 Bole <br />
              Suite 350, Addis Ababa, Ethiopia
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-bold text-lg text-gray-800 uppercase tracking-tight">
              Customer Relations
            </p>
            <p className="text-gray-500">
              Direct Line:{" "}
              <span className="text-black font-medium">+251712957043</span>
            </p>
            <p className="text-gray-500">
              Support Email:{" "}
              <span className="text-black font-medium">
                support@forever.com
              </span>
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100 w-full">
            <p className="font-bold text-lg text-gray-800 uppercase tracking-tight">
              Careers at Forever
            </p>
            <p className="text-gray-500 max-w-sm">
              Join our creative team and help us redefine the future of global
              fashion and ecommerce.
            </p>
            <button className="mt-4 border border-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 active:scale-95">
              Explore Openings
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
