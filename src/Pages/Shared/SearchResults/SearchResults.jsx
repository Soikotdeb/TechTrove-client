

import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const [searchText, setSearchText] = useState(''); // State to hold the search query
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://tech-trove-gadget-bazar-database.vercel.app/searchByHomePage/${encodeURIComponent(searchText)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-gray-800 min-h-screen'>
            <Link className='hover:underline mb-4 inline-block font-extrabold hover:text-red-600 text-white p-2' to='/'><FaHome size={34}></FaHome></Link>
            <div className="flex items-center space-x-2 p-2 justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="py-2 px-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 w-60"
                />
                <button
                    onClick={handleSearch}
                    className="py-2 px-4 rounded-lg bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-500 hover:to-gray-700 text-white hover:text-gray-100 transition duration-300"
                >
                    SEARCH
                </button>
            </div>
            {/* Render search results here */}
            <div className='bg-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
                {searchResults.map((result) => (
                    <div key={result._id} className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-xl">
                        <img src={result.productImages[0]} alt="" className="w-full h-48 object-cover mb-2 rounded-lg" />
                        <p className="text-lg font-semibold text-red-400 hover:font-extrabold">➲ {result.productName}</p>
                        <div className="text-gray-600 text-base">
                            <p><span className="font-bold text-gray-700 hover:underline">❂ Color: </span> {result.productColor}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ Product Price: </span>$ {result.price}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ Storage: </span> {result.storage}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ Description: </span> {result.description}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ MadeIn</span> : {result.madeIn}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ DiscountAmount</span> $ {result.discountAmount}</p>
                            <p><span className="font-bold text-gray-700 hover:underline">❂ Available Product: </span> {result.productQuantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;