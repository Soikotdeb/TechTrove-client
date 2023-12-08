// import React, { useContext, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaShoppingBag, FaTrashAlt } from "react-icons/fa";
// import limitedTime from "../../assets/image/limitedTime.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import UseAdmin from "../../Hook/UseAdmin";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../Provider/AuthProvider";

// const LatestOffers = () => {
//   const [latestOffers, setLatestOffers] = useState([]);
//   const [isAdminOrInstructor] = UseAdmin();

//   const { data: fetchedOffers = [], refetch } = useQuery(
//     ["latestOffers"],
//     async () => {
//       const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/LatestOffers");
//       return res.json();
//     }
//   );

//   useEffect(() => {
//     setLatestOffers(fetchedOffers);
//   }, [fetchedOffers]);

//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure you want to delete?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes",
//         cancelButtonText: "No",
//       });

//       if (result.isConfirmed) {
//         await fetch(`https://tech-trove-gadget-bazar-database.vercel.app/LatestOffer/${id}`, {
//           method: "DELETE",
//         });
//         await Swal.fire({
//           icon: "success",
//           title: "Offer Deleted",
//           text: "Offer has been deleted successfully.",
//           confirmButtonText: "OK",
//         });
//         // Refetch Question after delete
//         refetch();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

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

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // add to cart action---
//   const handleAddToCart = (product) => {
//     if (user && user.email) {
//       const cartItem = {
//         menuItemId: product._id,
//         name: product.productName,
//         image: product.productImages[0],
//         color: product.productColor,
//         price: product.price,
//         quantity: "1",
//         email: user.email,
//       };

//       fetch("https://tech-trove-gadget-bazar-database.vercel.app/carts", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(cartItem),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Failed to add item to the cart");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           // Check for any key in the response to indicate success
//           if (data && (data.insertedId || data.success)) {
//             // Show a success toast
//             toast.success("Product added to the cart.", {
//               position: "top-right",
//               autoClose: 1500,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           } else {
//             throw new Error("Failed to add item to the cart");
//           }
//         })
//         .catch((error) => {
//           console.error("Error adding item to the cart:", error);
//           // Show an error toast
//           toast.error("Failed to add item to the cart. Please try again.", {
//             position: "top-right",
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
//       toast.warning("Please login to order the product", {
//         position: "top-right",
//         autoClose: false,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       navigate("/login", { state: { from: location } });
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-3xl font-bold mb-4 text-center text-gray-400 hover:text-purple-700">
//         Latest Offers
//       </h2>
//       <hr className="border border-gray-300" />

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
//         {latestOffers.map((product) => (
//           <div key={product._id} className="max-w-md mx-auto mb-1 relative">
//             <div className="bg-gray-400 antialiased text-gray-900 p-1 rounded-lg">
//               <img
//                 src={product.productImages[0]}
//                 alt="random image"
//                 className="w-full h-96 object-cover object-center rounded-lg shadow-md"
//               />
//               <div className="relative px-1 -mt-20 py-1">
//                 <div className="bg-white p-8 rounded-lg shadow-lg">
//                   <div className="flex items-baseline">
//                     <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
//                       New
//                     </span>
//                     <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
//                       &bull; Product Of TechTrove{" "}
//                       <Link onClick={() => handleAddToCart(product)}>
//                         <FaShoppingBag size={20} />
//                       </Link>
//                     </div>
//                   </div>
//                   <h4 className="mt-2 text-sm font-semibold uppercase leading-tight truncate">
//                     {product.productName}
//                   </h4>
//                   <div className="mt-2 text-xl">
//                     ৳ {product.price}
//                     <span className="text-gray-600 text-base"> /BD</span>
//                   </div>
//                   <div className="mt-1">
//                     <span className="text-teal-600 text-lg font-semibold">
//                       {product.productColor}/color{" "}
//                     </span>
//                     <span className="text-base text-gray-600">
//                       <Link
//                         to="#"
//                         className="hover:underline"
//                         onClick={() => openModal(product)}
//                       >
//                         (View All Details)
//                       </Link>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {isAdminOrInstructor === "admin" ||
//             isAdminOrInstructor === "instructor" ? (
//               <div className="absolute top-0 right-0 p-2 rounded-lg flex items-center">
//                 <Link>
//                   <FaTrashAlt
//                     size={16}
//                     className="text-red-600 hover:text-red-700 mr-1"
//                     onClick={() => handleDelete(product._id)}
//                   />
//                 </Link>
//               </div>
//             ) : null}
//             <div className="absolute top-0 left-0 w-16 h-14 rounded-lg">
//               <img src={limitedTime} alt="" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LatestOffers;




import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import limitedTime from "../../assets/image/limitedTime.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAdmin from "../../Hook/UseAdmin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const LatestOffers = () => {
  const [latestOffers, setLatestOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const [isAdminOrInstructor] = UseAdmin();

  const { data: fetchedOffers = [], refetch } = useQuery(
    ["latestOffers"],
    async () => {
      const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/LatestOffers");
      return res.json();
    }
  );

  useEffect(() => {
    setLatestOffers(fetchedOffers);
  }, [fetchedOffers]);

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
        await fetch(`https://tech-trove-gadget-bazar-database.vercel.app/LatestOffer/${id}`, {
          method: "DELETE",
        });
        await Swal.fire({
          icon: "success",
          title: "Offer Deleted",
          text: "Offer has been deleted successfully.",
          confirmButtonText: "OK",
        });
        // Refetch Question after delete
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
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

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (product) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: product._id,
        name: product.productName,
        image: product.productImages[0],
        color: product.productColor,
        price: product.price,
        quantity: product.productQuantity,
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = latestOffers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-400 hover:text-purple-700">
        Latest Offers
      </h2>
      <hr className="border border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
        {currentItems.map((product) => (
          <div key={product._id} className="max-w-md mx-auto mb-1 relative">
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
                    <span className="text-gray-600 text-base"> /BD</span>
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
            <div className="absolute top-0 left-0 w-16 h-14 rounded-lg">
              <img src={limitedTime} alt="" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination component */}
      <div className="flex justify-center mt-4 items-center">
      <Link> <FaArrowAltCircleLeft
                  onClick={() => paginate(currentPage - 1)}
                  size={20}
                /></Link>
        {Array.from({ length: Math.ceil(latestOffers.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-3 py-1 bg-gray-300 rounded-full ${
              currentPage === index + 1 ? "bg-teal-500 text-white font-semibold" : "hover:bg-gray-400"
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
  );
};

export default LatestOffers;

