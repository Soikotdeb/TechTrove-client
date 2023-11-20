
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowAltCircleRight, FaHome, FaTags } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import pending from '../../../assets/image//pendingSale.jpeg'
import Quality from '../../../assets/image//QualityGurrented.png'
import logo from "../../../assets/image/company logo.png";

const BrowsCategory = () => {
    const { id } = useParams();
    const [categoryData, setCategoryData] = useState(null);
  
    useEffect(() => {
      // Initialize AOS animations
      AOS.init();
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://tech-trove-gadget-bazar-database.vercel.app/categoryProducts/${id}`);
          setCategoryData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Initial fetch of data
      fetchData();
  
      // Setup interval to periodically fetch data
      const interval = setInterval(fetchData, 1000); // Adjust the interval as needed
  
      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }, [id]);

    const handleFullDetails = (product) => {
        // Store specific offer information in local storage
        localStorage.setItem("BrowsDetails", JSON.stringify(product));
      };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-50">
      <div className="container mx-auto px-4 py-2">
      <Link to="/" className="  hover:underline mb-4 inline-block font-extrabold hover:text-red-600 text-white">
     <FaHome size={28} title="GO HOME"/>
      </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-1">
          {categoryData ? (
            categoryData.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                 <div className="relative overflow-hidden h-52">
              <img
                src={product.productImages[0]}
                alt={product.productName}
                className="w-full h-full object-contain"
              />
              <p
                className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-lg flex items-center"
                title="Discount Price"
              >
                <FaTags className="text-gray-100 mr-1" />
                -${product.discountAmount}
              </p>
              <img
                className="absolute top-4 left-3 w-12 rounded-lg"
                src={pending}
                alt=""
              />
              <img
                className="absolute top-20 left-3 w-12 rounded-lg "
                src={Quality}
                alt=""
              />
              <img
                className="absolute top-32 left-4 w-10 rounded-lg hover:w-20"
                src={logo}
                alt=""
              />


            </div>
            <div className="p-4">
              <div className="flex items-center mt-2">
                <p className="text-gray-500 text-lg font-semibold mb-1">
                  <span className="font-semibold">✪ ➺  :</span>{" "}
                  {product.productName}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">✪ Regular Price :</span>{" "}
                  {product.price}
                </p>
              </div>
               <div className="flex items-center mt-2">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">✪ Discount :</span>{" "}
                  {product.discountAmount}
                </p>
              </div> 
              <div className='flex justify-between'>
              <div className="flex items-center mt-2">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">✪ AvailableProduct :</span>{" "}
                {product.productQuantity}
                </p>
              </div>
              <div>
                    <Link   onClick={() => handleFullDetails(product)} to={`/BrowsCategoryDetails/${product._id}`} className='text-gray-600 hover:text-purple-600' title='Details'> <FaArrowAltCircleRight size={24}/></Link>
               </div>
              </div>
            </div>
              </motion.div>
            ))
          ) : (
            <div className="border-t-4 border-red-500 w-12 h-12 animate-spin rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsCategory;
