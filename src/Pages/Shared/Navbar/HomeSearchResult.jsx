
import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Provider/AuthProvider';

const HomeSearchResult = () => {
  // Retrieve data from localStorage
  const result = JSON.parse(localStorage.getItem('searchResults')) || [];

  const [expandedDescription, setExpandedDescription] = useState({});

  const toggleDescription = (productId) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };


//   add to cart action

const { user } = useContext(AuthContext);
const navigate = useNavigate();
const location = useLocation();

const handleAddToCart = (searchResult) => {
  if (user && user.email) {
    const cartItem = {
      menuItemId: searchResult._id,
      name: searchResult.productName,
      image: searchResult.productImages[0],
      color: searchResult.productColor,
      price: searchResult.price,
      quantity: "1",
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
        toast.error("Failed to add item to the cart. Please try again.", {
          position: "top-right",
          autoClose: 3000,
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

  return (
    <div>
      <div className="flex flex-row p-2">
        <Link to="/" className="flex items-center gap-1 hover:underline text-teal-800">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
      <hr className="my-1 border-t border-blue-500" />

      {result.length === 0 ? (
        <p className="text-lg font-semibold text-center mt-8">No search results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {result.map((searchResult) => (
            <div key={searchResult._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={searchResult?.productImages[0]}
                alt={searchResult?.productName}
                className="w-full h-56 object-cover object-center rounded-lg shadow-md"
              />
               <div className="flex items-baseline mt-1">
                    <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                      New
                    </span>
                    <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider flex gap-4 items-center">
                      &bull; Product Of TechTrove{" "}
                      <Link onClick={() => handleAddToCart(searchResult)}>
                        <FaShoppingBag title='Add To Cart' size={20} />
                      </Link>
                    </div>
                  </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-600">{searchResult?.productName}</h3>
              <p className="text-gray-600 mb-2">
                {expandedDescription[searchResult._id]
                  ? searchResult?.description
                  : `${searchResult?.description.slice(0, 100)}`}
                <button
                  className="text-teal-600 hover:underline focus:outline-none"
                  onClick={() => toggleDescription(searchResult._id)}
                >
                  {expandedDescription[searchResult._id] ? '...Read Less' : '...Read More'}
                </button>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold text-lg">
                  ৳{searchResult?.price}
                  <span className="text-teal-400">/BD</span>
                </p>
                <p className="text-green-500 font-semibold">{searchResult?.discountAmount}৳ Off</p>
              </div>
              <div className="mt-1">
                <div className="flex gap-5 items-center">
                  <div>
                    <span className="text-teal-600 text-lg font-semibold">
                      {' '}
                      {searchResult.productColor}/color{' '}
                    </span>
                  </div>
                  <p className="text-gray-600">/ {searchResult?.productQuantity} Product Available </p>
                </div>
                <p className="text-gray-600">Made In: {searchResult?.madeIn}</p>
                <p className="text-gray-600">Storage: {searchResult?.storage}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSearchResult;

