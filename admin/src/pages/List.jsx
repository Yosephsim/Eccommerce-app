import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ፍለጋውን ለመቆጣጠር
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // ማረጋገጫ
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } },
        );

        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 🔍 ምርቶችን በፍለጋ ቃል የማጣራት ስራ
  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <p className="font-bold text-lg text-gray-700">All Products List</p>

        {/* Search Input Field */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg py-2 px-4 w-full outline-none focus:border-black transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* ------- Table Header ------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* ------- Filtered Product List ------- */}
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-2 py-2 px-4 border text-sm hover:bg-gray-50 transition-all"
              key={index}
            >
              <img
                className="w-12 rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <p className="font-medium text-gray-800">{item.name}</p>
              <p>{item.category}</p>
              <p className="font-semibold">{item.price} ETB</p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-xl text-gray-400 hover:text-red-500 transition-colors font-bold"
              >
                ×
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500 italic">
            No products found matching "{searchTerm}"
          </p>
        )}
      </div>
    </>
  );
};

export default List;
