import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ReviewsSection = ({ productId, reviews = [], fetchProductData, description }) => {
  const { backendUrl, token } = useContext(ShopContext);
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews'); // 'description' ወይም 'reviews'

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login to post a review");
    if (userReview.trim().length < 5) return toast.error("Review is too short!");

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/product/review",
        { productId, rating, comment: userReview },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUserReview("");
        setRating(5);
        fetchProductData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      {/* TABS */}
      <div className="flex">
        <b
          onClick={() => setActiveTab('description')}
          className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
        >
          Description
        </b>
        <p
          onClick={() => setActiveTab('reviews')}
          className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`}
        >
          Reviews ({reviews.length})
        </p>
      </div>

      {/* TAB CONTENT */}
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        {activeTab === 'description' ? (
          <p>{description || "No description available."}</p>
        ) : (
          <div>
            {/* Review Form */}
            <form onSubmit={onSubmitHandler} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-10">
              <h4 className="font-bold text-black text-lg mb-4">Write a Customer Review</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-700">Rating:</p>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-1 border rounded outline-none text-yellow-600 font-bold"
                  >
                    {[5, 4, 3, 2, 1].map((num) => <option key={num} value={num}>{num} Stars</option>)}
                  </select>
                </div>
                <textarea
                  rows={4}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="How was the quality?..."
                  className="w-full p-3 border border-gray-200 rounded-lg text-black outline-none focus:ring-1 focus:ring-black"
                  required
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-black text-white px-8 py-2.5 rounded-md text-sm font-bold self-start disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Post Review"}
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-8">
              {reviews.length > 0 ? reviews.map((item, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-black">{item.userName}</p>
                    <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                  </div>

                  {/* Verified Badge - አሁን 'item' በሚለው map ውስጥ ስለሆነ ይሰራል */}
                  {item.verified && (
                    <div className='flex items-center gap-1 text-green-600 text-[11px] font-bold mb-2'>
                      <span className="text-[14px]">✓</span> Verified Purchase
                    </div>
                  )}

                  <div className="flex text-yellow-500 text-xs mb-2">
                    {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                  </div>
                  <p className="text-gray-700">{item.comment}</p>
                </div>
              )) : (
                <p className="text-center py-10">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;