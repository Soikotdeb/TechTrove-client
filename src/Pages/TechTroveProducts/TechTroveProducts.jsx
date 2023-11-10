import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AOS from "aos";
import { Link } from "react-router-dom";

const TechTroveProducts = () => {
  const [TechTrove, setTechTroveProduct] = useState([]);

  useEffect(() => {
    AOS.init();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/TechTrove');
        if (!response.ok) {
          throw new Error('Failed to fetch TechTrove data');
        }
        const data = await response.json();
        setTechTroveProduct(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <Tabs>
        <TabList className="flex">
          <div className="font-bold text-3xl mr-2">
            <small>TechTrove Products </small>
            <hr className="border-green-500 border-t-2 w-full" />
          </div>
        </TabList>
        <hr className="border-black border-t-2 w-99 mt-2" />
        <div>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
              {TechTrove.map((product) => (
                <div key={product._id} className="max-w-md mx-auto mb-8">
                  
                  <div className="bg-gray-400 antialiased text-gray-900">
                    <img
                      src={product.productImages[0]}
                      alt="random image"
                      className="w-full h-96 object-cover object-center rounded-lg shadow-md"
                    />
                    <div className="relative px-3 -mt-16 py-1">
                      <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                          <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                            New
                          </span>
                          <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            2 baths &bull; 3 rooms
                          </div>
                        </div>
                        <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
                          {product.productName}
                        </h4>
                        <div className="mt-2 text-xl">
                        ৳ {product.price}
                          <span className="text-gray-600 text-base"> /BD</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-teal-600 text-lg font-semibold">
                            {product.productColor}/color{" "}
                          </span>
                          <span className="text-base text-gray-600">
                            <Link className="hover:underline"> (View All Details)</Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TechTroveProducts;

