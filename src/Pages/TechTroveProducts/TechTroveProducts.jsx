
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaExchangeAlt,
  FaHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import AOS from "aos";
import { Link } from "react-router-dom";

const TechTroveProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

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

  return (
    <div className="mb-28">
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
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-x-2">
              {featured.map((feature) => (
                <div
                  key={feature.id}
                  className={`card card-compact w-96 bg-base-300 shadow-xl relative ${
                    feature.id === hoveredCard ? "hovered" : ""
                  }`}
                  onMouseEnter={() => handleCardHover(feature.id)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="image-container">
                    <figure>
                      <img
                        className={`w-full p-1 h-auto transform transition-transform duration-300 ${
                          feature.id === hoveredCard ? "scale-110" : ""
                        }`}
                        src={feature.image}
                        alt="Shoes"
                      />
                    </figure>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{feature.phone_name}</h2>
                    <p className="gap-x-4 gap-y-3">{feature.facility}</p>
                    <p>{feature.color}</p>
                    <p>{feature.quantity}</p>
                    <p>{feature.region}</p>
                    <p>{feature.rating}</p>
                    <p>{feature.price}</p>
                    <div
                      className={`card-actions justify-end ${
                        feature.id === hoveredCard ? "opacity-100" : "opacity-0"
                      }`}
                      data-aos="fade-left"
                    >
                      <div className="options-icons flex justify-center items-center">
                        <Link className="icon icon-large hover:text-purple-700" title="Quick view">
                          <FaSearch className="mr-2" size={30} />
                        </Link>
                        <Link
                          className="icon icon-large hover:text-purple-700"
                          title="Select options"
                        >
                          <FaShoppingCart className="mx-2" size={30} />
                        </Link>
                        <Link className="icon icon-large hover:text-purple-700" title="Compare">
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
                </div>
              ))}
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
