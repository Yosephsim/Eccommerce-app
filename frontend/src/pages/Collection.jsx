import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // Toggle SubCategory
  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // 🔥 MAIN FILTER LOGIC (SEARCH + FILTER + SORT)
  useEffect(() => {
    let productCopy = [...products]

    // 🔍 SEARCH (applies to ALL products)
    if (showSearch && search.trim() !== '') {
      productCopy = productCopy.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 📦 CATEGORY
    if (category.length > 0) {
      productCopy = productCopy.filter(product =>
        category.includes(product.category)
      )
    }

    // 🧥 SUBCATEGORY
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(product =>
        subCategory.includes(product.subCategory)
      )
    }

    // 🔃 SORTING
    if (sortType === 'low-high') {
      productCopy.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      productCopy.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(productCopy)

  }, [products, search, showSearch, category, subCategory, sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* LEFT FILTER */}
      <div>
        <p className="text-xl font-medium mb-5 flex items-center gap-2">
          Filter
          <img
            className={`h-3 sm:hidden transition-transform ${showFilters ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <button
          className="sm:hidden mb-3 text-sm text-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Category */}
        <div className={`border py-3 pl-5 mt-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Categories</p>
          {["Men", "Women", "Kids"].map(item => (
            <label key={item} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                value={item}
                onChange={toggleCategory}
                checked={category.includes(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* SubCategory */}
        <div className={`border py-3 pl-5 mt-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          {["Topwear", "Bottomwear", "Winterwear"].map(item => (
            <label key={item} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                value={item}
                onChange={toggleSubCategory}
                checked={subCategory.includes(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border px-2 text-sm"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {filteredProducts.map(product => (
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
    </div>
  )
}

export default Collection
