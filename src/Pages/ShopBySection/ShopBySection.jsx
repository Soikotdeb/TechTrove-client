import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaShoppingBag,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAdmin from "../../Hook/UseAdmin";
import Swal from "sweetalert2";
import useCart from "../../Hook/useCart";
import { useQuery } from "@tanstack/react-query";

const ShopBySection = () => {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [isAdminOrInstructor] = UseAdmin();
  const [refetch] = useCart();

  const { data: FeaturedProduct = [] } = useQuery(
    ["FeaturedProducts"],
    async () => {
      const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/FeaturedProducts");
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

  const [PremiumGadget, setPremiumGadgetData] = useState([]);

  useEffect(() => {
    const fetchPremiumGadgetData = async () => {
      try {
        const response = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/PremiumGadget");
        if (!response.ok) {
          throw new Error("Failed to fetch Premium Gadget data");
        }
        const data = await response.json();
        setPremiumGadgetData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch Premium Gadget data when the component mounts
    fetchPremiumGadgetData();

    // Set up interval for refetching every 3 seconds
    const intervalId = setInterval(() => {
      fetchPremiumGadgetData();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // All Premium Gadget  offer data Load to the homepage only category=macBook
  const [macbookData, setMacbookData] = useState([]);

  useEffect(() => {
    const fetchMacbookData = async () => {
      try {
        const response = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/MacBook");
        if (!response.ok) {
          throw new Error("Failed to fetch MacBook data");
        }
        const data = await response.json();
        setMacbookData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch MacBook data when the component mounts
    fetchMacbookData();

    // Set up interval for refetching every 3 seconds
    const intervalId = setInterval(() => {
      fetchMacbookData();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
        color: macBook.productColor,
        price: macBook.price,
        quantity:macBook.productQuantity,
        category:macBook.category,
        email: user.email,
      };

      fetch("https://tech-trove-gadget-bazar-database.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // Show a success toast
            toast.success("Product added to the cart.", {
              position: "top-right",
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
      toast.warning("Please login to order the Product", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login", { state: { from: location } });
    }
  };

  // delete action
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        await fetch(`https://tech-trove-gadget-bazar-database.vercel.app/delete/${id}`, {
          method: "DELETE",
        });
        await Swal.fire({
          icon: "success",
          title: "Product Deleted",
          text: "Data has been deleted successfully.",
          confirmButtonText: "OK",
        });
        // Refetch cart data after delete
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // new arrival data load to the server side ----------------------
  const [newArrivalData, setNewArrivalData] = useState([]);

  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        const response = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/NewArrival");
        if (!response.ok) {
          throw new Error("Failed to fetch new arrival data");
        }
        const data = await response.json();
        setNewArrivalData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch data when the component mounts
    fetchNewArrivalData();

    // Set up interval for refetching every 5 seconds
    const intervalId = setInterval(() => {
      fetchNewArrivalData();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount and unmount

  // Pagination logic
  const [currentPageNewArrival, setCurrentPageNewArrival] = useState(1);
  const [currentPageMacbook, setCurrentPageMacbook] = useState(1);
  const [currentPagePremiumGadget, setCurrentPagePremiumGadget] = useState(1);
  const [itemsPerPage] = useState(6);

  const paginateNewArrival = (pageNumber) => {
    setCurrentPageNewArrival(pageNumber);
  };

  const paginateMacbook = (pageNumber) => {
    setCurrentPageMacbook(pageNumber);
  };

  const paginatePremiumGadget = (pageNumber) => {
    setCurrentPagePremiumGadget(pageNumber);
  };

  const openModal = (product) => {
    Swal.fire({
      title: `${product.productName}`,
      html: `
        <div class="w-full h-48 mb-2">
         <hr/>
          <img src=${product.productImages[0]} class="w-1/2 h-full object-cover mx-auto" />
        </div>
        <hr/>
        <div class="flex flex-wrap gap-2 justify-center">
          <div class="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg">
            <p class="text-teal-800 mb-2">Price: ৳ ${product.price} /BD</p>
            <p class="text-blue-800">Color: ${product.productColor}</p>
          </div>
          <div class="flex flex-col items-center hover:bg-gray-100  rounded-lg">
            <p class="text-purple-800 mb-1">Storage: ${product.storage}</p>
            <p class="text-red-800 mb-1">Made In By: ${product.madeIn}</p>
          </div>
            <p class="text-green-800"> ${product.productQuantity} Product Available </p>
            <p class="text-indigo-800">Discount: ${product.discountAmount} / Tk</p>
            <p class="text-yellow-800">${product.description}</p>
        </div>
      `,
    });
  };

  return (
    <div className="bg-gray-200 py-10 mt-2">
      <div className="flex gap-4">
        <div className=" md:w-1/5 w-full mt-2 border border-gray-600 hidden sm:block">
          <h1 className="font-extrabold text-white text-lg bg-green-700 text-center p-4">
            FEATURED PRODUCTS
          </h1>
          {FeaturedProduct.slice(0, showAll ? FeaturedProduct.length : 7).map(
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
                    <p>❂ Price: ৳ {featured.price}</p>
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

            {/* Tab Panels */}
            <div>
              {/* NewArrival Collection TabPanel */}
              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-2">
                    {newArrivalData
                      .slice(
                        (currentPageNewArrival - 1) * itemsPerPage,
                        currentPageNewArrival * itemsPerPage
                      )
                      .map((product) => (
                        <div
                          key={product._id}
                          className="max-w-md mx-auto mb-1 relative"
                        >
                          <div className="bg-gray-400 antialiased text-gray-900 p-1 rounded-lg">
                            <img
                              src={product.productImages[0]}
                              alt="random image"
                              className="w-full h-96 object-cover object-center rounded-lg shadow-md"
                            />
                            <div className="relative px-1 -mt-20 py-1">
                              <div className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="flex items-baseline">
                                  <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                    New
                                  </span>
                                  <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
                                    &bull; Product Of TechTrove{" "}
                                    <Link
                                      onClick={() => handleAddToCart(product)}
                                    >
                                      <FaShoppingBag size={20} />
                                    </Link>
                                  </div>
                                </div>
                                <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
                                  {product.productName}
                                </h4>
                                <div className="mt-2 text-xl">
                                  ৳ {product.price}
                                  <span className="text-gray-600 text-base">
                                    {" "}
                                    /BD
                                  </span>
                                </div>
                                <div className="mt-1">
                                  <span className="text-teal-600 text-lg font-semibold">
                                    {product.productColor}/color{" "}
                                  </span>
                                  <span className="text-base text-gray-600">
                                    <Link
                                      to="#"
                                      className="hover:underline"
                                      onClick={() => openModal(product)}
                                    >
                                      (View All Details)
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {isAdminOrInstructor === "admin" ||
                          isAdminOrInstructor === "instructor" ? (
                            <div className="absolute top-0 right-0 p-2 rounded-lg flex items-center">
                              <Link>
                                <FaTrashAlt
                                  size={16}
                                  className="text-red-600 hover:text-red-700 mr-1"
                                  onClick={() => handleDelete(product._id)}
                                />
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      ))}
                  </div>
                  {/* Pagination component */}
                  <div className="flex justify-center mt-4 items-center">
                  <Link><FaArrowAltCircleLeft
                  onClick={() => paginateNewArrival(currentPageNewArrival - 1)}
                  size={20}
                /></Link>
                    {Array.from({
                      length: Math.ceil(newArrivalData.length / itemsPerPage),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginateNewArrival(index + 1)}
                        className={`mx-2 px-3 py-1 bg-gray-300 rounded-full ${
                          currentPageNewArrival === index + 1
                            ? "bg-teal-500 text-white"
                            : "hover:bg-gray-400"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                   <Link><FaArrowAltCircleRight
                  onClick={() => paginateNewArrival(currentPageNewArrival + 1)}
                  size={20}
                /></Link>
                  </div>
                </div>
              </TabPanel>

              {/* Macbook Collection TabPanel */}
              <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-2">
                  {macbookData
                    .slice(
                      (currentPageMacbook - 1) * itemsPerPage,
                      currentPageMacbook * itemsPerPage
                    )
                    .map((product) => (
                      <div
                        key={product._id}
                        className="max-w-md mx-auto mb-1 relative"
                      >
                        <div className="bg-gray-400 antialiased text-gray-900 p-1 rounded-lg">
                          <img
                            src={product.productImages[0]}
                            alt="random image"
                            className="w-full h-96 object-cover object-center rounded-lg shadow-md"
                          />
                          <div className="relative px-1 -mt-20 py-1">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                              <div className="flex items-baseline">
                                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                  New
                                </span>
                                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
                                  &bull; Product Of TechTrove{" "}
                                  <Link
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    <FaShoppingBag size={20} />
                                  </Link>
                                </div>
                              </div>
                              <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
                                {product.productName}
                              </h4>
                              <div className="mt-2 text-xl">
                                ৳ {product.price}
                                <span className="text-gray-600 text-base">
                                  {" "}
                                  /BD
                                </span>
                              </div>
                              <div className="mt-1">
                                <span className="text-teal-600 text-lg font-semibold">
                                  {product.productColor}/color{" "}
                                </span>
                                <span className="text-base text-gray-600">
                                  <Link
                                    to="#"
                                    className="hover:underline"
                                    onClick={() => openModal(product)}
                                  >
                                    (View All Details)
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {isAdminOrInstructor === "admin" ||
                        isAdminOrInstructor === "instructor" ? (
                          <div className="absolute top-0 right-0 p-2 rounded-lg flex items-center">
                            <Link>
                              <FaTrashAlt
                                size={16}
                                className="text-red-600 hover:text-red-700 mr-1"
                                onClick={() => handleDelete(product._id)}
                              />
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
                {/* Pagination component */}
                <div className="flex justify-center mt-4 items-center">
                <Link><FaArrowAltCircleLeft
                  onClick={() => paginateMacbook(currentPageMacbook - 1)}
                  size={20}
                /></Link>
                  {Array.from({
                    length: Math.ceil(macbookData.length / itemsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginateMacbook(index + 1)}
                      className={`mx-2 px-3 py-1 bg-gray-300 rounded-full ${
                        currentPageMacbook === index + 1
                          ? "bg-teal-500 text-white"
                          : "hover:bg-gray-400"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <Link><FaArrowAltCircleRight
                  onClick={() => paginateMacbook(currentPageMacbook + 1)}
                  size={20}
                /></Link>
                </div>
              </TabPanel>

              {/* Premium Gadget TabPanel */}
              <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-2">
                  {PremiumGadget.slice(
                    (currentPagePremiumGadget - 1) * itemsPerPage,
                    currentPagePremiumGadget * itemsPerPage
                  ).map((product) => (
                    <div
                      key={product._id}
                      className="max-w-md mx-auto mb-1 relative"
                    >
                      <div className="bg-gray-400 antialiased text-gray-900 p-1 rounded-lg">
                        <img
                          src={product.productImages[0]}
                          alt="random image"
                          className="w-full h-96 object-cover object-center rounded-lg shadow-md"
                        />
                        <div className="relative px-1 -mt-20 py-1">
                          <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                New
                              </span>
                              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
                                &bull; Product Of TechTrove{" "}
                                <Link onClick={() => handleAddToCart(product)}>
                                  <FaShoppingBag size={20} />
                                </Link>
                              </div>
                            </div>
                            <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
                              {product.productName}
                            </h4>
                            <div className="mt-2 text-xl">
                              ৳ {product.price}
                              <span className="text-gray-600 text-base">
                                {" "}
                                /BD
                              </span>
                            </div>
                            <div className="mt-1">
                              <span className="text-teal-600 text-lg font-semibold">
                                {product.productColor}/color{" "}
                              </span>
                              <span className="text-base text-gray-600">
                                <Link
                                  to="#"
                                  className="hover:underline"
                                  onClick={() => openModal(product)}
                                >
                                  (View All Details)
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isAdminOrInstructor === "admin" ||
                      isAdminOrInstructor === "instructor" ? (
                        <div className="absolute top-0 right-0 p-2 rounded-lg flex items-center">
                          <Link>
                            <FaTrashAlt
                              size={16}
                              className="text-red-600 hover:text-red-700 mr-1"
                              onClick={() => handleDelete(product._id)}
                            />
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                {/* Pagination component */}
                <div className="flex justify-center mt-4 items-center">
                <Link><FaArrowAltCircleLeft
                  onClick={() => paginatePremiumGadget(currentPagePremiumGadget - 1)}
                  size={20}
                /></Link>
                  {Array.from({
                    length: Math.ceil(PremiumGadget.length / itemsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginatePremiumGadget(index + 1)}
                      className={`mx-2 px-3 py-1 bg-gray-300 rounded-full ${
                        currentPagePremiumGadget === index + 1
                          ? "bg-teal-500 text-white"
                          : "hover:bg-gray-400"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <Link><FaArrowAltCircleRight
                  onClick={() => paginatePremiumGadget(currentPagePremiumGadget + 1)}
                  size={20}
                /></Link>
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
