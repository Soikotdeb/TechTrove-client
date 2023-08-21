import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaArrowAltCircleRight, FaTags, FaTrashAlt } from "react-icons/fa";
import discount from "../../assets/image/discount.png";
import specialOffer from "../../assets/image/specialOffer.png";
import limitedTime from "../../assets/image/limitedTime.png";
import { Link } from "react-router-dom";
import UseAdmin from "../../Hook/UseAdmin";
import Swal from "sweetalert2";

const LatestOffers = () => {
  const [latestOffers, setLatestOffers] = useState([]);
  const [isAdminOrInstructor] = UseAdmin();

  const { data: fetchedOffers = [],refetch } = useQuery(["latestOffers"], async () => {
    const res = await fetch("http://localhost:5000/LatestOffers");
    return res.json();
  });

  useEffect(() => {
    setLatestOffers(fetchedOffers);
  }, [fetchedOffers]);

  const handleFullDetails = (offer) => {
    // Store specific offer information in local storage
    localStorage.setItem("OfferDetails", JSON.stringify(offer));
  };

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
          await fetch(`http://localhost:5000/LatestOffer/${id}`, {
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



  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-400 hover:text-purple-700">
        Latest Offers
      </h2>
      <hr className="border border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
        {latestOffers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl"
          >
            <div className="relative overflow-hidden h-52">
              <img
                src={offer.productImages[0]}
                alt={offer.productName}
                className="w-full h-full object-contain"
              />
              <p
                className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-lg flex items-center"
                title="Discount Price"
              >
                <FaTags className="text-gray-100 mr-1" />
                -${offer.discountAmount}
              </p>
              <div>
                {isAdminOrInstructor === "admin" ||
                isAdminOrInstructor === "instructor" ? (
                  <Link
                  onClick={() => handleDelete(offer._id)}
                    className="absolute top-16 right-3 p-2 rounded-lg flex items-center"
                    title="Delete Offer"
                  >
                    <FaTrashAlt
                      size={24}
                      className="text-red-600 hover:text-red-700  mr-1"
                    />
                  </Link>
                ) : null}
              </div>
              <img
                className="absolute top-14 left-3 w-10 rounded-lg"
                src={discount}
                alt=""
              />
              <img
                className="absolute top-3 left-3 w-10 rounded-lg"
                src={specialOffer}
                alt=""
              />
              <img
                className="absolute top-24 left-3 w-10 rounded-lg"
                src={limitedTime}
                alt=""
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                ➺ {offer.productName}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <p className="text-gray-600">
                  <span className="font-semibold">✪ Regular Price :</span>{" "}
                  {offer.price}
                </p>
                <Link
                  to={`/fullDetails/${offer._id}`}
                  onClick={() => handleFullDetails(offer)}
                >
                  <FaArrowAltCircleRight
                    className="text-gray-600"
                    size={24}
                    title="Tap to See All Details"
                  />
                </Link>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">✪ Color :</span>{" "}
                  {offer.productColor}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestOffers;
