import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center bg-gray-50 py-10 rounded-lg">
        <div className="border p-6 rounded-lg">
          <img src={assets.exchange_icon} alt="Exchange policy" className="w-14 h-auto mx-auto mb-5"/>
          <p className="font-semibold text-sm text-gray-700"> Easy exchange policy
          </p>
          <p className="text-xs text-gray-500 mt-1">
            We offer a hassle-free exchange policy for all products within 7 days of purchase.
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <img
            src={assets.quality_icon}
            alt="Quality guarantee"
            className="w-14 h-auto mx-auto mb-5"
          />
          <p className="font-semibold text-sm text-gray-700">
            Quality guarantee
          </p>
          <p className="text-xs text-gray-500 mt-1">
            We guarantee the quality of all our products for 1 year.
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <img
            src={assets.support_icon}
            alt="24/7 support"
            className="w-14 h-auto mx-auto mb-5"
          />
          <p className="font-semibold text-sm text-gray-700">
            24/7 Support
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Our dedicated support team is available 24/7 to assist you with any questions or concerns.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
