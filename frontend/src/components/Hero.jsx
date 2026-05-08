import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (

        <div className="flex flex-col sm:flex-row border border-gray-400">
  {/* Hero left side */}
  <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
    <div className="text-[#414141]">
      <div className="flex items-center gap-2">
        <p className="w-8 md:w-12 h-[2px] bg-[#414141]"></p>
        <p className="font-medium text-sm md:text-base">
          OUR BESTSELLERS
        </p>
      </div>

      <h1 className="prata-regular text-3xl sm:py-3 lg:text-4xl leading-relaxed">
        Latest Arrivals
      </h1>

      <div className="flex items-center gap-2">
        <p className=" text-sm font-semibold md:text-base mt-4">SHOP NOW</p>
        <p className="w-6 md:w-11 h-[1px] bg-[#414141]"></p>
      </div>
    </div>
  </div>

  {/* Hero right side */}
  <div className="w-full sm:w-1/2 flex justify-end items-center">
    <img
      src={assets.hero_img}
      className="w-full max-w-md"
      alt="hero"
    />
  </div>
</div>

    )
}

export default Hero
