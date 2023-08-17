
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiSearchLine } from 'react-icons/ri';

const MyAddedProducts = () => {
    const { user } = useContext(AuthContext);
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchPerformed, setSearchPerformed] = useState(false); // New state

    const fetchUserAddedProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/instructor/myAddedProducts/${encodeURIComponent(user?.email)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserAddedProducts();
    }, [fetchUserAddedProducts]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure you want to delete?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/MyAddedProduct/${id}`, {
                    method: 'DELETE'
                });
                await Swal.fire({
                    icon: 'success',
                    title: 'Product Deleted',
                    text: 'Your product has been deleted successfully.',
                    confirmButtonText: 'OK'
                });
                // Refetch products after delete
                fetchUserAddedProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        const filteredResults = products.filter(product =>
            product.productName.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
        setSearchPerformed(true); // Set searchPerformed to true
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="p-4 bg-gray-800 w-full h-full">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen bg-gray-800">
                <div className="flex flex-col items-center">
                  <div className="border-t-4 border-red-500 w-12 h-12 animate-spin rounded-full"></div>
                  <p className="mt-4 text-red-400 font-semibold">
                  Content is loading Please Wait Few Seconds... <br />
                  </p>
                </div>
              </div>
            ) : (
                <div>
                     <div className="border border-green-400 text-white mb-1">
                        <marquee behavior="alternate" direction="left">
                            <p className="text-purple-300"> {user?.displayName} - Your All Added Products Here</p>
                        </marquee>
                    </div>
                    <div className="align-middle flex justify-center text-center items-center">
                    <div className="align-middle flex justify-center text-center items-center mb-2">
                        <input
                            type="text"
                            placeholder="Search Your Products"
                            className="input input-bordered input-error w-full max-w-xs mr-1"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            <RiSearchLine className="hover:text-red-400" />
                        </button>
                    </div>
                    <div>
                    {searchPerformed && (
                        <button
                            className="bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2 ml-5"
                            onClick={() => {
                                setSearchResults([]);
                                setSearchText("");
                                setSearchPerformed(false); // Reset searchPerformed to false
                            }}
                        >
                            See All
                        </button>
                    )}
                    </div>
                    </div>
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(searchResults.length > 0 ? searchResults : products).map((product, index) => (
                            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-xl">
                                <img
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                         src={hoveredIndex === index ? product.productImages[0] : product.productImages[1] || product.productImages[0] }
                         alt={product.productName}
                         className="w-full h-48 object-cover mb-2 rounded-lg"
                     />
                        <p className="text-lg font-semibold">{product.productName}</p>
                     <div className="text-gray-600 text-base" >
                     <p><span className="font-bold text-gray-700 hover:underline">Color: </span> {product.productColor}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">Product Price: </span>$ {product.price}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">Storage: </span> {product.storage}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">Category: </span> {product.category}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">MadeIn</span> : {product.madeIn}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">DiscountAmount</span> $ {product.discountAmount}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">Available Product: </span> {product.productQuantity}</p>
                     <p><span className="font-bold text-gray-700 hover:underline">Description: </span> {product.description}</p>
                     </div>
                     <div className="flex justify-between mt-2">
                     <Link className="bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2"> <FaEdit title="Click To Edit" /></Link>
                     <Link onClick={() => handleDelete(product._id)}  className="bg-red-500 flex items-center font-semibold hover:text-purple-300 hover:bg-red-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2"> <FaTrash title="Click To Delete" /></Link>
                     </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedProducts;


