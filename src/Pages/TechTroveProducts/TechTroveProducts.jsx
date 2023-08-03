// import React, { useEffect, useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import {
//   FaExchangeAlt,
//   FaHeart,
//   FaShoppingCart,
//   FaSearch,
// } from "react-icons/fa";
// import AOS from "aos";
// import { Link } from "react-router-dom";

// const TechTroveProducts = () => {
//   const [featured, setFeatured] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const handleTabChange = (index) => {
//     setActiveTab(index);
//   };

//   useEffect(() => {
//     fetch("product.json")
//       .then((res) => res.json())
//       .then((data) => setFeatured(data));
//   }, []);

//   return (
//     <div className=" bg-gray-100 rounded-lg">
//       <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
//         <TabList className="flex">
//           <div className="">
//             <div className="font-bold text-3xl mr-2">
//               <small>TechTrove Products </small>
//               <hr className="border-green-500 border-t-2 w-full" />
//             </div>
//           </div>
//           <Tab>FEATURED</Tab>
//           <Tab>NEW</Tab>
//           <Tab>TOP SELLERS</Tab>
//         </TabList>
//         <hr className="border-black border-t-2 w-99" />

//         <div>
//           <TabPanel>
//             <div className="grid grid-cols-1 mt-4 py-3 px-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-x-1">
//               {featured.map((feature) => (
//                 <div
//                   key={feature.id}
//                   className="flex justify-center items-center h-scree"
//                 >
//                   <div className="relative w-80 h-80 bg-blue-100 p-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
//                     <img src={feature.image} alt="" />
//                     <div className="mt-2">
//                       <p>Name:{feature.phone_name} </p>
//                       <p>Color:{feature.color} </p>
//                       <p>Region:{feature.region} </p>
//                       <p>Price: {feature.price}</p>
//                     </div>
//                     <div className="absolute top-32 left-0 w-full h-full bg-transparent flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
//                       <Link
//                         className="icon icon-large hover:text-purple-700"
//                         title="Quick view"
//                       >
//                         <FaSearch className="mr-2" size={30} />
//                       </Link>
//                       <Link
//                         className="icon icon-large hover:text-purple-700"
//                         title="Select options"
//                       >
//                         <FaShoppingCart className="mx-2" size={30} />
//                       </Link>
//                       <Link
//                         className="icon icon-large hover:text-purple-700"
//                         title="Compare"
//                       >
//                         <FaExchangeAlt className="mx-2" size={30} />
//                       </Link>
//                       <Link
//                         className="icon icon-large hover:text-purple-700"
//                         title="Add to wishlist"
//                       >
//                         <FaHeart className="ml-2" size={30} />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </TabPanel>

//           <TabPanel>
//             <h2>New Products</h2>
//           </TabPanel>

//           <TabPanel>
//             <h2>Top Selling Products</h2>
//           </TabPanel>
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default TechTroveProducts;

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaExchangeAlt,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaEye,
} from "react-icons/fa";
import AOS from "aos";
import { Link } from "react-router-dom";

const TechTroveProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [numCardsToShow, setNumCardsToShow] = useState(12); // Number of cards to show initially
  const incrementValue = 12; // Increment value for "See More" button

  useEffect(() => {
    AOS.init();
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    fetch("product.json")
      .then((res) => res.json())
      .then((data) => setFeatured(data));
  }, []);

  const handleSeeMore = () => {
    setNumCardsToShow(numCardsToShow + incrementValue);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList className="flex">
          <div className="">
            <div className="font-bold text-3xl mr-2">
              <small>TechTrove Products </small>
              <hr className="border-green-500 border-t-2 w-full" />
            </div>
          </div>
          <Tab>FEATURED</Tab>
          <Tab>NEW</Tab>
          <Tab>TOP SELLERS</Tab>
        </TabList>
        <hr className="border-black border-t-2 w-99" />

        <div>
          <TabPanel>
            <div className="grid grid-cols-1 mt-4 py-3 px-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-x-1 bg-gray-100">
              {featured.slice(0, numCardsToShow).map((feature) => (
                <div
                  key={feature.id}
                  className="flex justify-center items-center h-scree"
                >
                  <div className="relative w-80 h-80 bg-blue-100 p-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <img src={feature.image} alt="" />
                    <div className="mt-2">
                      <p>Name: {feature.phone_name} </p>
                      <p>Color: {feature.color} </p>
                      <p>Region: {feature.region} </p>
                      <p>Price: {feature.price}</p>
                    </div>
                    <div className="absolute top-32 left-0 w-full h-full bg-transparent flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
                      <Link
                        className="icon icon-large hover:text-purple-700"
                        title="Quick view"
                      >
                        <FaSearch className="mr-2" size={30} />
                      </Link>
                      <Link
                        className="icon icon-large hover:text-purple-700"
                        title="Select options"
                      >
                        <FaShoppingCart className="mx-2" size={30} />
                      </Link>
                      <Link
                        className="icon icon-large hover:text-purple-700"
                        title="Compare"
                      >
                        <FaExchangeAlt className="mx-2" size={30} />
                      </Link>
                      <Link
                        className="icon icon-large hover:text-purple-700"
                        title="Add to wishlist"
                      >
                        <FaHeart className="ml-2" size={30} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
            {numCardsToShow < featured.length && (
              <div className="flex justify-center mt-2 ">
              <Link className="bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2" onClick={handleSeeMore}>
              <FaEye className="mr-1" /> SEE MORE
            </Link>

              </div>
            )}
            </div>
          </TabPanel>

          <TabPanel>
            <h2>New Products</h2>
          </TabPanel>

          <TabPanel>
            <h2>Top Selling Products</h2>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};
export default TechTroveProducts;
