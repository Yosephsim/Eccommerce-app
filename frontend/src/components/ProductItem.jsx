import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img src={image[0]} alt={name} className=" hover:scale-105 transition-transform ease-in-out" />
            </div>
            <p className="text-gray-700">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
