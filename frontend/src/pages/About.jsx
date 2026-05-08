import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox.jsx";

const About = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Header */}
      <div className="text-2xl text-center pt-10 border-t border-gray-100">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2">
          The story behind our passion for fashion
        </p>
      </div>

      {/* Mission Section */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-16">
        <img
          className="w-full md:w-1/2 rounded-sm shadow-sm"
          src={assets.about_us || assets.about_img}
          alt="About Boutique"
        />
        <div className="flex flex-col justify-center gap-8 md:w-1/2 text-gray-600">
          <div className="space-y-4">
            <h3 className="text-black font-bold uppercase tracking-widest text-sm italic">
              Our Story
            </h3>
            <p className="leading-relaxed">
              Founded in 2025, our boutique was built for customers who value
              quality, convenience, and trust. We curate products that combine
              timeless style with modern performance.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-black font-bold uppercase tracking-widest text-sm italic">
              Our Mission
            </h3>
            <p className="leading-relaxed">
              Our mission is to empower individuals through fashion by providing
              a seamless online shopping experience backed by a commitment to
              exceptional global standards.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-2xl py-8 border-t border-gray-50">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Features Grid */}
      <div className="flex flex-col md:flex-row text-sm mb-24 border border-gray-100">
        <div className="border-b md:border-b-0 md:border-r border-gray-100 px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all duration-300">
          <b className="uppercase tracking-widest text-black">
            Quality Assurance
          </b>
          <p className="text-gray-500 leading-relaxed">
            We rigorously test and curate our products to ensure they meet the
            highest international standards of durability and style.
          </p>
        </div>
        <div className="border-b md:border-b-0 md:border-r border-gray-100 px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all duration-300">
          <b className="uppercase tracking-widest text-black">Convenience</b>
          <p className="text-gray-500 leading-relaxed">
            From intuitive navigation to fast delivery, we make global fashion
            accessible at the click of a button.
          </p>
        </div>
        <div className="px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all duration-300">
          <b className="uppercase tracking-widest text-black">
            Customer Support
          </b>
          <p className="text-gray-500 leading-relaxed">
            Our dedicated team is available 24/7 to ensure every interaction
            with our brand is positive and helpful.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
