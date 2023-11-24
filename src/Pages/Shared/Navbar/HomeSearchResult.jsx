
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeSearchResult = () => {
  // Retrieve data from localStorage
  const result = JSON.parse(localStorage.getItem('searchResults')) || [];

  const [expandedDescription, setExpandedDescription] = useState({});

  const toggleDescription = (productId) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div>
      <div className="flex flex-row p-2">
        <Link to="/" className="flex items-center gap-1 hover:underline text-teal-800">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
      <hr className="my-1 border-t border-blue-500" />

      {result.length === 0 ? (
        <p className="text-lg font-semibold text-center mt-8">No search results found...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {result.map((searchResult) => (
            <div key={searchResult._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={searchResult?.productImages[0]}
                alt={searchResult?.productName}
                className="w-full h-56 object-cover object-center rounded-lg shadow-md"
              />
              <h3 className="text-xl font-semibold mb-2 text-teal-600">{searchResult?.productName}</h3>
              <p className="text-gray-600 mb-2">
                {expandedDescription[searchResult._id]
                  ? searchResult?.description
                  : `${searchResult?.description.slice(0, 100)}`}
                <button
                  className="text-teal-600 hover:underline focus:outline-none"
                  onClick={() => toggleDescription(searchResult._id)}
                >
                  {expandedDescription[searchResult._id] ? '...Read Less' : '...Read More'}
                </button>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold text-lg">
                  ৳{searchResult?.price}
                  <span className="text-teal-400">/BD</span>
                </p>
                <p className="text-green-500 font-semibold">{searchResult?.discountAmount}৳ Off</p>
              </div>
              <div className="mt-1">
                <div className="flex gap-5 items-center">
                  <div>
                    <span className="text-teal-600 text-lg font-semibold">
                      {' '}
                      {searchResult.productColor}/color{' '}
                    </span>
                  </div>
                  <p className="text-gray-600">/ {searchResult?.productQuantity} Product Available </p>
                </div>
                <p className="text-gray-600">Made In: {searchResult?.madeIn}</p>
                <p className="text-gray-600">Storage: {searchResult?.storage}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSearchResult;

