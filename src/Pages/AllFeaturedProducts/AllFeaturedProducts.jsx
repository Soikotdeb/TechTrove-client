

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaHome, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllFeaturedProducts = () => {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data: FeaturedProduct = [] } = useQuery(
    ["FeaturedProducts"],
    async () => {
      const res = await fetch("http://localhost:5000/FeaturedProducts");
      return res.json();
    },
    {
      staleTime: 10000,
    }
  );

  useEffect(() => {
    setFeaturedProducts(FeaturedProduct);
  }, [FeaturedProduct]);

  const handleSearch = async () => {
    if (searchText) {
      const res = await fetch(`http://localhost:5000/searchByFeaturedProducts/${searchText}`);
      const data = await res.json();
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 min-h-screen">
      <div className='flex justify-between'>
        <Link
          to="/"
          className="hover:underline mb-4 inline-block font-extrabold hover:text-red-600 text-white"
        >
          <FaHome size={28} title="GO HOME"/>
        </Link>
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="py-3 pr-10 pl-4 text-black font-semibold rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-400 hover:bg-green-500 rounded-full p-2"
            onClick={handleSearch}
          >
            <FaSearch className="text-gray-900" />
          </button>
        </div>
      </div>
      {/* Render search results or featured products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(searchText ? searchResults : FeaturedProducts).map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg h-full"
          >
            <img
              src={
                product.productImages[0] ||
                product.productImages[1] ||
                product.productImages[0]
              }
              alt=""
              className="w-full h-32 object-cover"
            />
            <p className="text-lg font-semibold text-red-400 hover:font-extrabold mt-2">
              ➲ {product.productName}
            </p>
            <div className="text-gray-50 text-base">
            <p><span className="font-bold text-gray-400 hover:underline">❂ Color: </span> {product.productColor}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ Product Price: </span>$ {product.price}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ Storage: </span> {product.storage}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ Category: </span> {product.category}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ MadeIn</span> : {product.madeIn}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ DiscountAmount</span> $ {product.discountAmount}</p>
                     <p><span className="font-bold text-gray-400 hover:underline">❂ Available Product: </span> {product.productQuantity}</p>
                    <div className='flex justify-between'>
                    <p><span className="font-bold text-gray-400 hover:underline">❂ Description: </span> {product.description}</p>
                    <Link> <FaShoppingBag className='hover:text-gray-400' size={24}/></Link>
                    </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFeaturedProducts;
