import React from "react";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";


const NewOfferDetails = () => {
  const storedOffer = localStorage.getItem("OfferDetails");
  const offerDetails = JSON.parse(storedOffer);

  const handleRemoveDetails = () => {
    localStorage.removeItem("OfferDetails");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <Link
        onClick={handleRemoveDetails}
        to="/"
        className="  hover:underline mb-4 inline-block font-extrabold hover:text-red-600 text-white"
      >
     <FaHome size={28} title="GO HOME"/>
      </Link>
      <div className="max-w-3xl mx-auto">
        {offerDetails ? (
          <div className="bg-gradient-to-br from-gray-700 to-gray-900 border border-b border-l border-r border-t border-gray-500 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex gap-2 mb-3 justify-between">
            <img className="w-36 h-auto rounded-lg border" src={offerDetails.productImages[0]} alt="" />
            <img className="w-36 h-auto rounded-lg" src={offerDetails?.productImages[1]} alt="no image found" />
            <img className="w-36 h-auto rounded-lg" src={offerDetails?.productImages[2]} alt="no image found" />
            <img className="w-36 h-auto rounded-lg" src={offerDetails?.productImages[3]} alt="no image found" />
            </div>
            <p className="mb-2 text-2xl">{offerDetails.productName}</p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Product Color: </span>     <span className="text-base    font-extralight"> {' '} {offerDetails.productColor}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Product Price: </span>    <span className="text-base    font-extralight"> {' '} {offerDetails.price}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Product Storage: </span>   <span className="text-base    font-extralight"> {' '} {offerDetails.storage}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Product Description:</span><span className="text-base    font-extralight"> {' '} {offerDetails.description}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Brand Name: </span>        <span className="text-base    font-extralight"> {' '} {offerDetails.category}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Made In: </span>           <span className="text-base    font-extralight"> {' '} {offerDetails.madeIn}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Discount Amount: $</span>  <span className="text-base    font-extralight"> {' '} {offerDetails.discountAmount}</span></p>
            <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-indigo-400 text-sm">Available Product: </span> <span className="text-base    font-extralight"> {' '} {offerDetails.productQuantity}</span></p>
           <div className="flex justify-between"> 
           <p className="mb-2"><span className="font-semibold text-indigo-300 hover:text-gray-400 text-sm">Total Price: </span>$       {offerDetails.price - offerDetails.discountAmount}  </p>
           <p>Shop Now <br />
           <Link><FaShoppingBag size={24} className="text-gray-300 hover:text-gray-400 ms-5 mt-1 "/></Link>
           </p>
           </div>
          </div>
        ) : (
          <p className="text-xl">No offer details found.</p>
        )}
      </div>
    </div>
  );
};

export default NewOfferDetails;