import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { assets } from "../assets/assets";
import ReviewsSection from "../components/ReviewsSection"; // 1. Import ተደርጓል

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data Section */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* --- PRODUCT IMAGES --- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto gap-3 sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-gray-500 transition-all"
                alt="Thumbnail"
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={image}
              alt="Product"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* --- PRODUCT DETAILS --- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* RATING DISPLAY */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_half_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-gray-400 text-sm">
              ({productData.reviews?.length || 0})
            </p>
          </div>

          <p className="text-2xl font-bold my-4 text-gray-900">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold text-gray-700">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-200 px-5 py-2.5 rounded-md hover:border-black transition-all ${size === item ? "bg-black text-white" : "bg-gray-50 text-gray-700"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-10 py-4 text-sm font-bold rounded-lg active:scale-95 transition-transform hover:bg-gray-800"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-100" />

          <div className="text-sm text-gray-500 mt-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <p>100% Original Products</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <p>Cash on delivery available</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              <p>Easy 30 days returns & exchanges</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION & REVIEWS SECTION (Functional) --- */}
      {/* 2. እዚህ ጋር ካምፓነንቱን ጠራነው */}
      <ReviewsSection
        productId={productData._id}
        reviews={productData.reviews}
        fetchProductData={fetchProductData}
      />

      {/* RELATED PRODUCTS */}
      <div className="mt-24">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          currentId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen animate-pulse">
      Loading product details...
    </div>
  );
};

export default Product;
