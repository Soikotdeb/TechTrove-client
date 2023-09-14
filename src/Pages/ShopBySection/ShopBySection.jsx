import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import image from "../../assets/image/section.jpeg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowAltCircleRight } from "react-icons/fa";


const ShopBySection = () => {

  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  console.log(FeaturedProducts.length);


  const { data: FeaturedProduct = [] } = useQuery(["FeaturedProducts"], async () => {
    const res = await fetch("http://localhost:5000/FeaturedProducts");
    return res.json();
  });

  useEffect(() => {
    setFeaturedProducts(FeaturedProduct);
  }, [FeaturedProduct]);

  const handleFullDetails = (featured) => {
    // Store specific offer information in local storage
    localStorage.setItem("FeaturedDetails", JSON.stringify(featured));
  };

  const [showAll, setShowAll] = useState(false);

  
  return (
    <div className="bg-gray-200 py-10 mt-2">
      <div className="flex gap-4">
        <div
          className="relative rounded-lg flex items-center justify-center hidden md:block"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "20%",
            transition: "background-size 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundSize = "110%";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundSize = "cover";
          }}
        >
          <div>
            <div className="text-white py-24 text-center absolute inset-0 bg-black bg-opacity-50">
              <p>Latest Smartphone Giant</p>
              <p className="text-3xl">
                Oneplus is the <br /> latest Giant of <br /> android !!
              </p>
              <div className="mt-5">
                <Link
                  to=""
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Column */}
        <div className="flex-1">
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <div className="flex  justify-between font-semibold">
              <TabList className="flex">
                <div className="">
                  <div className="font-bold text-3xl mr-2">
                    <small>Shop By Section</small>
                    <hr className="border-green-500 border-t-2 w-full" />
                  </div>
                </div>
                <Tab>New Arrival</Tab>
                <Tab>Macbook Collection</Tab>
                <Tab>Premium Gadget</Tab>
              </TabList>
              <div className="text-2xl flex   gap-5 mr-3">
              <Link className="hidden md:block">❮</Link>
             <Link className="hidden md:block">❯</Link>
              </div>
            </div>

            {/* tabpanal  */}

            <div>
              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                     
                        <div className="card-body">
                          {/* contant */}

                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>

              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                       
                        <div className="card-body">
                          {/* contant */}
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>

              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                    <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                   
                        <div className="card-body">
                          
                          {/* contant */}
                        
                         
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>

{/* Feature Product */}
 <div className="md:w-1/5 w-full mt-2 border border-gray-600">
      <h1 className="font-extrabold text-white text-lg bg-green-700 text-center p-4">
        FEATURED PRODUCTS
      </h1>
      {FeaturedProduct.slice(0, showAll ? FeaturedProduct.length : 4).map((featured) => (
        <div key={featured._id} className="flex flex-col md:flex-row items-center justify-center md:gap-2 mt-2 p-4">
          <img
            className="rounded h-16 w-16 mt-1 md:mt-0"
            src={featured?.productImages[0]}
            alt=""
          />
          <div className="text-center md:text-left">
            <div>
              <p className="hover:text-gray-700 font-extrabold">
                ❂ {featured.productName}
              </p>
            </div>
            <div>
              <p>❂ Price: {featured.price}</p>
              <div className="flex gap-7">
                <p>❂ Discount: {featured.discountAmount}</p>
                <Link
                  to={`/fullDetails/${featured._id}`}
                  onClick={() => handleFullDetails(featured)}
                >
                  <FaArrowAltCircleRight
                    className="text-gray-600"
                    size={18}
                    title="Tap to See All Details"
                  />
                </Link>
              </div>
              <hr className="border-gray-400 border-t-2 w-[90%] mx-auto mt-2" />
            </div>
          </div>
        </div>
      ))}
      {!showAll && (
        <div className="text-center mt-2 mb-4">
          <Link
          to="/AllFeaturedProducts"
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            
          >
            See All Products
          </Link>
        </div>
      )}
    </div>
    
    </div>
  );
};

export default ShopBySection;

