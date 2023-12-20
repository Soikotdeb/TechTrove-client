// import React, { useContext, useEffect, useState } from "react";
// import { Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import AOS from "aos";
// import Swal from "sweetalert2";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingBag } from 'react-icons/fa';
// import { AuthContext } from "../../Provider/AuthProvider";
// import { toast } from "react-toastify";

// const TechTroveProducts = () => {
//   const [TechTrove, setTechTroveProduct] = useState([]);
//   const {user}=useContext(AuthContext)
//   const navigate = useNavigate();
// const location = useLocation();

//   useEffect(() => {
//     AOS.init();

//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/TechTrove");
//         if (!response.ok) {
//           throw new Error("Failed to fetch TechTrove data");
//         }
//         const data = await response.json();
//         setTechTroveProduct(data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();

//     const intervalId = setInterval(() => {
//       fetchData();
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const openModal = (product) => {
//     Swal.fire({
//       title: `${product.productName}`,
//       html: `
//         <div class="w-full h-48 mb-2">
//          <hr/>
//           <img src=${product.productImages[0]} class="w-1/2 h-full object-cover mx-auto" />
//         </div>
//         <hr/>
//         <div class="flex flex-wrap gap-2 justify-center">
//           <div class="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg">
//             <p class="text-teal-800 mb-2">Price: ৳ ${product.price} /BD</p>
//             <p class="text-blue-800">Color: ${product.productColor}</p>
//           </div>
//           <div class="flex flex-col items-center hover:bg-gray-100  rounded-lg">
//             <p class="text-purple-800 mb-1">Storage: ${product.storage}</p>
//             <p class="text-red-800 mb-1">Made In By: ${product.madeIn}</p>
//           </div>
//             <p class="text-green-800"> ${product.productQuantity} Product Available </p>
//             <p class="text-indigo-800">Discount: ${product.discountAmount} / Tk</p>
//             <p class="text-yellow-800">${product.description}</p>
//         </div>
//       `,
//     });
//   };

//   // add to cart action---
//   const handleAddToCart = (product) => {
//     if (user && user.email) {
//       const cartItem = {
//         menuItemId: product._id,
//         name: product.productName,
//         image: product.productImages[0],
//         color: product.productColor,
//         price: product.price,
//         quantity: '1',
//         email: user.email,
//       };

//       fetch('https://tech-trove-gadget-bazar-database.vercel.app/carts', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(cartItem),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error('Failed to add item to the cart');
//           }
//           return res.json();
//         })
//         .then((data) => {
//           // Check for any key in the response to indicate success
//           if (data && (data.insertedId || data.success)) {
//             // Show a success toast
//             toast.success('Product added to the cart.', {
//               position: 'top-right',
//               autoClose: 1500,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           } else {
//             throw new Error('Failed to add item to the cart');
//           }
//         })
//         .catch((error) => {
//           console.error('Error adding item to the cart:', error);
//           // Show an error toast
//           toast.error('Failed to add item to the cart. Please try again.', {
//             position: 'top-right',
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         });
//     } else {
//       // Show a warning toast
//       toast.warning('Please login to order the product', {
//         position: 'top-right',
//         autoClose: false,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       navigate('/login', { state: { from: location } });
//     }
//   };

//   return (
//     <div className="bg-gray-100 rounded-lg p-4">
//       <Tabs>
//         <TabList className="flex">
//           <div className="font-bold text-3xl mr-2">
//             <small>TechTrove Products </small>
//             <hr className="border-green-500 border-t-2 w-full" />
//           </div>
//         </TabList>
//         <hr className="border-black border-t-2 w-99 mt-2" />
//         <div>
//           <TabPanel>
//             <div>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
//               {TechTrove.map((product) => (
//                 <div key={product._id} className="max-w-md mx-auto mb-1">
//                   <div className="bg-gray-400 antialiased text-gray-900 p-1 rounded-lg">
//                     <img
//                       src={product.productImages[0]}
//                       alt="random image"
//                       className="w-full h-96 object-cover object-center rounded-lg shadow-md"
//                     />
//                     <div className="relative px-1 -mt-20 py-1">
//                       <div className="bg-white p-8 rounded-lg shadow-lg">
//                         <div className="flex items-baseline">
//                           <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
//                             New
//                           </span>
//                           <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
//                           &bull; Product Of TechTrove <Link onClick={() => handleAddToCart(product)}><FaShoppingBag size={20}/></Link>
//                           </div>
//                         </div>
//                         <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
//                           {product.productName}
//                         </h4>
//                         <div className="mt-2 text-xl">
//                           ৳ {product.price}
//                           <span className="text-gray-600 text-base"> /BD</span>
//                         </div>
//                         <div className="mt-1">
//                           <span className="text-teal-600 text-sm font-semibold">
//                             {product.productColor}/color{" "}
//                           </span>
//                           <span className="text-base text-gray-600">
//                             <Link
//                               to="#"
//                               className="hover:underline"
//                               onClick={() => openModal(product)}
//                             >
//                               (View All Details)
//                             </Link>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             </div>
//           </TabPanel>
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default TechTroveProducts;

import React, { useContext, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AOS from "aos";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowCircleRight,
  FaShoppingBag,
} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const TechTroveProducts = () => {
  const [TechTrove, setTechTroveProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init();

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tech-trove-gadget-bazar-database.vercel.app/TechTrove"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch TechTrove data");
        }
        const data = await response.json();
        setTechTroveProduct(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // open modal

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

  // add to cart action---
  const handleAddToCart = (product) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: product._id,
        name: product.productName,
        image: product.productImages[0],
        color: product.productColor,
        price: product.price,
        quantity: product.productQuantity,
        category: product.category,
        email: user.email,
      };

      fetch("https://tech-trove-gadget-bazar-database.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add item to the cart");
          }
          return res.json();
        })
        .then((data) => {
          // Check for any key in the response to indicate success
          if (data && (data.insertedId || data.success)) {
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
          } else {
            throw new Error("Failed to add item to the cart");
          }
        })
        .catch((error) => {
          console.error("Error adding item to the cart:", error);
          // Show an error toast
          toast.success("Product added to the cart.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      // Show a warning toast
      toast.warning("Please login to order the product", {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TechTrove.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
                {currentItems.map((product) => (
                  <div key={product._id} className="max-w-md mx-auto mb-1">
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
                            <span className="text-teal-600 text-sm font-semibold">
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
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 items-center">
               <Link> <FaArrowAltCircleLeft
                  onClick={() => paginate(currentPage - 1)}
                  size={20}
                /></Link>
                {Array.from({
                  length: Math.ceil(TechTrove.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-2 px-3 py-1 bg-gray-300 rounded-full ${
                      currentPage === index + 1
                        ? "bg-teal-500 text-white font-semibold"
                        : "hover:bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <Link><FaArrowAltCircleRight
                  onClick={() => paginate(currentPage + 1)}
                  size={20}
                /></Link>
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TechTroveProducts;
