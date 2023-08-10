
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/AuthProvider';
import { Link } from "react-router-dom";

const MyAddedProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/instructor/myAddedProducts/${encodeURIComponent(user.email)}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.log("Error:", response.status);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchUserData();
    }, [user.email]);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="p-4 bg-gray-800  w-full h-full">
            <div className="border border-green-400 text-white mb-2">
            <marquee behavior="alternate" direction="left">
               <p className="text-purple-300"> {user.displayName} - Your All Added Products Here</p>
            </marquee>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-xl"
                       
                    >
                        <img
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                            src={hoveredIndex === index ? product.productImages[2] : product.productImages[1]}
                            alt={product.productName}
                            className="w-full h-48 object-cover mb-2 rounded-lg"
                        />
                           <p className="text-lg font-semibold">productName: {product.productName}</p>
                        <div className="text-gray-600 text-base" >
                        <p>Color: {product.productColor}</p>
                        <p>Storage: {product.storage}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>MadeIn: {product.madeIn}</p>
                        <p>DiscountAmount: {product.discountAmount}</p>
                        <p>Quantity: {product.productQuantity}</p>
                        </div>
                        <div className="flex justify-between mt-2">
                        <Link className="bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2">Update</Link>
                        <Link className="bg-red-500 flex items-center font-semibold hover:text-purple-300 hover:bg-red-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedProducts;

// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from './../../Provider/AuthProvider';
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const MyAddedProducts = () => {
//     const { user } = useContext(AuthContext);
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/users/instructor/myAddedProducts/${encodeURIComponent(user.email)}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProducts(data);
//                 } else {
//                     console.log("Error:", response.status);
//                 }
//             } catch (error) {
//                 console.log("Error:", error);
//             }
//         };
//         fetchUserData();
//     }, [user.email]);

//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     // Initialize AOS
//     useEffect(() => {
//         AOS.init();
//     }, []);

//     return (
//         <div className="p-4 bg-gray-800 w-full h-full">
//             <div className="border border-green-400 text-white mb-2">
//                 <marquee behavior="alternate" direction="left">
//                     <p className="text-purple-300"> {user.displayName} - Your All Added Products Here</p>
//                 </marquee>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {products.map((product, index) => (
//                     <div
//                         key={product._id}
//                         className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-xl"
//                         data-aos="fade-up" // Add AOS animation attribute
//                     >
//                         <img
//                             onMouseEnter={() => setHoveredIndex(index)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                             src={hoveredIndex === index ? product.productImages[2] : product.productImages[1]}
//                             alt={product.productName}
//                             className="w-full h-48 object-cover mb-2 rounded-lg"
//                         />
//                         <p className="text-lg font-semibold">productName: {product.productName}</p>
//                         <div className="text-gray-600 text-base" >
//                         <p>Color: {product.productColor}</p>
//                         <p>Storage: {product.storage}</p>
//                         <p>Description: {product.description}</p>
//                         <p>Category: {product.category}</p>
//                         <p>MadeIn: {product.madeIn}</p>
//                         <p>DiscountAmount: {product.discountAmount}</p>
//                         <p>Quantity: {product.productQuantity}</p>
//                         </div>
//                         <div className="flex justify-between mt-2">
//                             <Link className="bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2">Update</Link>
//                             <Link className="bg-red-500 flex items-center font-semibold hover:text-purple-300 hover:bg-red-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2">Delete</Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyAddedProducts;
