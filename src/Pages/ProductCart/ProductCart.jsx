
import React from 'react';
import useCart from '../../Hook/useCart';
import { FaHome, FaTrashAlt, FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCart = () => {
    const [cart] = useCart();

    // Calculate the total price, handling missing or non-numeric product prices
    const total = cart.reduce((sum, product) => {
        const price = parseFloat(product.price);
        if (!isNaN(price)) {
            return price + sum;
        }
        return sum;
    }, 0);

    return (
        <div className="container mx-auto">
            <Link
                to="/"
                className="hover:underline mb-2 inline-block font-extrabold hover-text-red-600 text-purple p-2"
            >
                <FaHome size={28} title="GO HOME" />
            </Link>
            <h2 className="text-2xl font-bold mb-2">Your Shopping Cart</h2>
            <div className='flex justify-between mb-1 p-2 border border-purple-400'>
            <p className='text-lg'>Total Amount : ৳ {total.toFixed(2)}</p>
            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover-bg-blue-700">
               <FaWallet title='Order All Products' size={20} />
               </button>
            </div>
            <table className="w-full border-2 border-yellow-500 border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 border border-yellow-500">Product Image</th>
                        <th className="p-3 border border-yellow-500">Product Name</th>
                        <th className="p-3 border border-yellow-500">Product Price</th>
                        <th className="p-3 border border-yellow-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr key={product._id} className="border-t hover-bg-gray-100 transition-colors duration-200">
                            <td className="p-3 border border-yellow-500">
                                <img src={product.image} alt={product.name} className="h-16 w-16" />
                            </td>
                            <td className="p-3 border border-yellow-300"><p className="mt-2">{product.name}</p></td>
                            <td className="p-3 border border-yellow-300">৳ {parseFloat(product.price).toFixed(2)}</td>
                            <td className="p-3 border border-yellow-300">
                                <button className="px-3 py-1 bg-red-500 text-white rounded hover-bg-red-700">
                                    <FaTrashAlt title='Remove to Cart' size={20} />
                                </button>
                                <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover-bg-blue-700">
                                    <FaWallet title='Order Single Product' size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductCart;

