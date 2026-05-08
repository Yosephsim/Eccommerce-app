import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSellerProducts, setBestSellerProducts] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter(
        (product) => product.bestseller === true
      )
      setBestSellerProducts(bestProducts.slice(0, 4))
    }
  }, [products])

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className="w-3/5 mx-auto text-xs sm:text-sm md:text-base text-gray-500 mt-4">
          Discover our best-selling products that customers love
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {bestSellerProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
