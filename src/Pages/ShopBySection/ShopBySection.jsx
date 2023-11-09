import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import image from "../../assets/image/section.jpeg";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowAltCircleRight, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const ShopBySection = () => {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);

  const { data: FeaturedProduct = [] } = useQuery(
    ["FeaturedProducts"],
    async () => {
      const res = await fetch("http://localhost:5000/FeaturedProducts");
      return res.json();
    }
  );

  useEffect(() => {
    setFeaturedProducts(FeaturedProduct);
  }, [FeaturedProduct]);

  const handleFullDetails = (featured) => {
    // Store specific offer information in local storage
    localStorage.setItem("FeaturedDetails", JSON.stringify(featured));
  };

  const [showAll, setShowAll] = useState(false);

  // All Premium Gadget  offer data Load to the homepage only category=Premium Gadget

  const [PremiumGadget, setFetchedPremiumGadget] = useState([]);

  const { data: fetchedPremiumGadget = [] } = useQuery(
    ["premiumGadget"],
    async () => {
      const res = await fetch("http://localhost:5000/PremiumGadget");
      if (!res.ok) {
        throw new Error("Failed to fetch Premium Gadget data");
      }
      return res.json();
    }
  );

  useEffect(() => {
    setFetchedPremiumGadget(fetchedPremiumGadget);
  }, [fetchedPremiumGadget]);



// All Premium Gadget  offer data Load to the homepage only category=Premium Gadget

  const [macbookData, setMacbookData] = useState([]);


  const { data: fetchedMacbookData = [] } = useQuery(
    ["MacBook"],
    async () => {
      const res = await fetch("http://localhost:5000/MacBook"); // Replace with the correct endpoint
      if (!res.ok) {
        throw new Error("Failed to fetch MacBook data");
      }
      return res.json();
    }
  );
  
  useEffect(() => {
    setMacbookData(fetchedMacbookData);
  }, [fetchedMacbookData]);
  
// add to cart action------

const { user } = useContext(AuthContext);
const navigate = useNavigate();
const location = useLocation();


const handleAddToCart = (macBook) => {
  if (user && user.email) {
    const cartItem = {
      menuItemId: macBook._id,
      name: macBook.productName,
      image: macBook.productImages[0],
      price: macBook.price,
      email: user.email,
    };

    fetch('http://localhost:5000/carts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // Show a success toast
          toast.success('Food added to the cart.', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
        }
      });
  } else {
    // Show a warning toast
    toast.warning('Please login to order the food', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/login', { state: { from: location } });
  }
};
// gadget add to cart action 
const handleAddToCartGadget = (gadget) => {
  if (user && user.email) {
    const cartItem = {
      menuItemId: gadget._id,
      name: gadget.productName,
      image: gadget.productImages[0],
      price: gadget.price,
      email: user.email,
    };

    fetch('http://localhost:5000/carts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // Show a success toast
          toast.success('Food added to the cart.', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
        }
      });
  } else {
    // Show a warning toast
    toast.warning('Please login to order the food', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/login', { state: { from: location } });
  }
};



  return (
    <div className="bg-gray-200 py-10 mt-2">
      <div className="flex gap-4">
        {/* Feature Product */}
        <div className=" md:w-1/5 w-full mt-2 border border-gray-600">
          <h1 className="font-extrabold text-white text-lg bg-green-700 text-center p-4">
            FEATURED PRODUCTS
          </h1>
          {FeaturedProduct.slice(0, showAll ? FeaturedProduct.length : 4).map(
            (featured) => (
              <div
                key={featured._id}
                className="flex flex-col md:flex-row items-center justify-center md:gap-2 mt-2 p-4"
              >
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
            )
          )}
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
                        <div className="card-body">{/* contant */}</div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>


   {/* this is Macbook Collection tabPanel */}
              <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                  {macbookData.map((macBook) => (
                    <div
                      key={macBook._id}
                      className="relative group overflow-hidden border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <div className="product-image">
                        <img
                          src={macBook.productImages[0]}
                          alt={macBook.productName}
                          className="w-full h-52 object-cover"
                        />
                        <p className="absolute top-1 right-1 text-purple-400">TechTrove</p>
                      </div>
                      <div className="product-info bg-white p-4">
                        <h2 className="text-sm font-semibold mb-2">
                          {macBook.productName}
                        </h2>
                        <p className="text-gray-700 font-extrabold text-sm">
                          {macBook.price}
                        </p>
                      </div>
                      <div className="product-details opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center text-center bg-base-100 bg-opacity-90 transition-all duration-300 ease-in-out transform scale-0 group-hover:scale-100 p-1">
                        <p className="text-gray-800 text-base">
                          Color: {macBook.productColor}
                        </p>
                        <p className="text-gray-800 text-base">
                          Description: {macBook.description}
                        </p>
                        <p className="text-gray-800 text-base">
                          Made In: {macBook.madeIn}
                        </p>
                        <p className="text-gray-800 text-base">
                          Storage: {macBook?.storage}
                        </p>
                        <p className="text-gray-800 text-base">
                          Available Product: {macBook.productQuantity}
                        </p>
                        <p className="text-gray-800 text-base">
                          Discount: ${macBook.discountAmount}
                        </p>
                       
                          
                       
                          <Link 
                           onClick={() => handleAddToCart(macBook)}
                          title="Tap to Add Cart"
                          className="bg-green-400 p-2 rounded-lg">
                            <FaShoppingBag></FaShoppingBag>
                          </Link>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>

              {/* this is Premium Gadget tabPanel */}

              <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                  {PremiumGadget.map((gadget) => (
                    <div
                      key={gadget._id}
                      className="relative group overflow-hidden border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <div className="product-image">
                        <img
                          src={gadget.productImages[0]}
                          alt={gadget.productName}
                          className="w-full h-52 object-cover"
                        />
                      </div>
                      <div className="product-info bg-white p-4">
                        <h2 className="text-sm font-semibold mb-2">
                          {gadget.productName}
                        </h2>
                        <p className="text-gray-700 font-extrabold text-sm">
                          {gadget.price}
                        </p>
                      </div>
                      <div className="product-details opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center text-center bg-base-100 bg-opacity-90 transition-all duration-300 ease-in-out transform scale-0 group-hover:scale-100">
                        <p className="text-gray-800 text-base">
                          Color: {gadget.productColor}
                        </p>
                        <p className="text-gray-800 text-base">
                          Description: {gadget.description}
                        </p>
                        <p className="text-gray-800 text-base">
                          Made In: {gadget.madeIn}
                        </p>
                        <p className="text-gray-800 text-base">
                          Storage: {gadget?.storage}
                        </p>
                        <p className="text-gray-800 text-base">
                        Available Product: {gadget.productQuantity}
                        </p>
                        <p className="text-gray-800 text-base">
                          Discount: ${gadget.discountAmount}
                        </p>

                        
                          <Link
                           onClick={() => handleAddToCartGadget(gadget)}
                          title="Tap to Add Cart"
                          className="bg-green-400 p-2 rounded-lg"
                          >
                            <FaShoppingBag></FaShoppingBag>
                          </Link>
                      
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopBySection;
