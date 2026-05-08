import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false); // Loading state

  // Images state
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1 && !image2 && !image3 && !image4) {
      return toast.error("Please upload at least one image");
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      // Append images logic
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg flex flex-col gap-6"
    >
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-sm text-gray-500">
          Create a new item in your international catalog.
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-700">Upload Images</p>
        <div className="flex flex-wrap gap-4">
          {[image1, image2, image3, image4].map((img, index) => {
            const setter = [setImage1, setImage2, setImage3, setImage4][index];
            const id = `image${index + 1}`;
            return (
              <label
                key={id}
                htmlFor={id}
                className="group relative cursor-pointer"
              >
                <div
                  className={`w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden transition-all ${img ? "border-black" : "border-gray-300 group-hover:border-gray-400"}`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={!img ? assets.upload_area : URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setter(e.target.files[0])}
                  type="file"
                  id={id}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Name and Description */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            type="text"
            placeholder="e.g. Premium Cotton T-Shirt"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all resize-none"
            placeholder="Provide a detailed description of the product..."
            required
          />
        </div>
      </div>

      {/* Category and Price */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2.5 border rounded-lg bg-white outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Sub Category</label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-2.5 border rounded-lg bg-white outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Price (ETB / $)</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            type="number"
            placeholder="0.00"
            min="0"
            required
          />
        </div>
      </div>

      {/* Sizes Section */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-gray-700">Available Sizes</label>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size],
                )
              }
              className={`px-4 py-2 rounded-md cursor-pointer font-medium transition-all border ${sizes.includes(size) ? "bg-black text-white border-black" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-3 py-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-5 h-5 accent-black cursor-pointer"
        />
        <label
          className="font-medium text-gray-700 cursor-pointer select-none"
          htmlFor="bestseller"
        >
          Feature on Bestseller List
        </label>
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`w-full sm:w-44 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800 active:scale-95"}`}
      >
        {loading ? "ADDING..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;
