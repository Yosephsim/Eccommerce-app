import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      let filteredProducts = products
        .filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase() &&
            product.subCategory === subCategory
        )
        .slice(0, 4);

      setRelated(filteredProducts);
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="text-center mb-6">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {related.map((product, index) => (
          <ProductItem className="w-full h-auto object-cover"
            key={index}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
