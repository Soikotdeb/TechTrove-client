import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import useCart from "./../../Hook/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const ProductCart = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [loading, setLoading] = useState(true);

    // personal details 
    const [customerAddress, setCustomerAddress] = useState('');
    const [paymentType, setPaymentType] = useState('paymentWithOrder');

    const handleAddressChange = (e) => {
      setCustomerAddress(e.target.value);
    };
  

  
    const handlePaymentTypeChange = (e) => {
      setPaymentType(e.target.value);
    };
  


  // Calculate the total price, handling missing or non-numeric product prices
  const total = cart.reduce((sum, product) => {
    const price = parseFloat(product.price);
    if (!isNaN(price)) {
      return price + sum;
    }
    return sum;
  }, 0);

  // shipping charge
  const shipping = 100;

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
        await fetch(`http://localhost:5000/ProductCart/${id}`, {
          method: "DELETE",
        });
        await Swal.fire({
          icon: "success",
          title: "Product Deleted",
          text: "Cart Data has been deleted successfully.",
          confirmButtonText: "OK",
        });
        // Refetch Question after delete
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   -----------------
  // Fetch cart data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); // You might need to handle the refetch logic from useCart appropriately
        setLoading(false);
      } catch (error) {
        // Handle any errors during data fetching
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refetch]);

  if (loading) {
    // You can render a loading indicator here while data is being fetched.
    return (
      <div>
        <div className="flex items-center justify-center h-screen bg-blue-200">
          <div className="border-t-4 border-blue-500 border-solid h-10 w-64 animate-spin"></div>
          <div className="border-t-4 border-purple-500 border-solid h-12 w-64 animate-spin"></div>
          <div className="border-t-4 border-blue-500 border-solid h-10 w-64 animate-spin"></div>
        </div>
      </div>
    );
  }





  return (
    <div className="container mx-auto mt-2 p-3 bg-slate-200 rounded shadow-md">
      <div className="flex  flex-col-reverse md:flex-row">
        <div className="w-8/12 min-h-screen">
          <div className="product-details mr-2">
            <div className="flex flex-row">
              <Link to="/" className="flex items-center gap-1 hover:underline">
                <FaArrowLeft /> Continue Shopping
              </Link>
            </div>
            <hr className="my-4 border-t border-blue-500" />
            <h6 className="mb-4 text-lg font-semibold">Shopping cart</h6>
            <div className="flex justify-between mb-4">
              <span>You have {cart.length} items in your cart</span>
              <div className="flex flex-row items-center">
                <span className="text-gray-500">Sort by:</span>
                <div className="flex items-center ml-2">
                  <span className="mr-1">price</span>
                  <RiArrowDownDoubleFill />
                </div>
              </div>
            </div>

            <div className="border p-1 border-red-200">
              {cart.map((product) => (
                <div key={product._id}>
                  <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded ">
                    <div className="flex flex-row items-center">
                      <img
                        className="rounded"
                        src={product.image}
                        width="40"
                        alt="Product"
                      />
                      <div className="ml-2">
                        <span className="font-semibold">{product.name}</span>{" "}
                        <br />
                        <span className="text-xs text-gray-500">
                          {product.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block">Qty. {product.quantity}</span>
                      <span className="ml-5 font-semibold">
                        ৳ {parseFloat(product.price).toFixed(2)}
                      </span>
                      <Link
                        onClick={() => handleDelete(product._id)}
                        className="ml-3 text-gray-500"
                      >
                        {" "}
                        <FaTrashAlt></FaTrashAlt>{" "}
                      </Link>
                      <Link className="ml-3 text-gray-500">
                        <GiWallet />{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-4/12 ml-4">
          <div className="payment-info bg-blue-500 text-white p-3 rounded">
            <div className="flex justify-between items-center">
              <span>Card details</span>
              <img
                className="rounded"
                src="https://i.ibb.co/HHc4n4T/Untitled.png"
                width="50"
                alt="Card"
              />
            </div>
            <span className="type block mt-3 mb-1">Card type</span>
            <div className="flex mb-3  gap-2">
              <span className="border border-red-100 p-2">
                <img
                  width="30"
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="Mastercard"
                />
              </span>

              <span className="border border-red-100 p-2">
                <img
                  width="30"
                  src="https://img.icons8.com/officel/48/000000/visa.png"
                  alt="VISA"
                />
              </span>

              <span className="border border-red-100 p-2">
                <img
                  width="30"
                  src="https://i.ibb.co/vxgjPv5/bkash1.png"
                  alt="bkash1"
                  border="0"
                />
              </span>

              <span className="border border-red-100 p-2">
                <img
                  width="30"
                  src="https://i.ibb.co/YLML4Vh/nagad.jpg"
                  alt="nagad"
                  border="0"
                />
              </span>

              <span className="border border-red-100 p-2">
                <img
                  width="25"
                  src="https://i.ibb.co/j31xJmY/roket.jpg"
                  alt="roket"
                  border="0"
                />
              </span>
            </div>
            {/* Repeat the above label.radio block for other card types */}

            {/*----------------------- personal details-------------------- */}
            <div className="border border-red-100 p-2">
      <label className="credit-card-label">Customer Details</label>
      <p>Email: {user?.email}</p>
      {/* Professional Options */}
      <div className="mt-2">
        <label className="credit-card-label">Type Your Home Address & Up Code</label>
        <input
          type="text"
          value={customerAddress}
          onChange={handleAddressChange}
          className="border p-2 w-full text-black rounded-lg"
          placeholder="Enter your address & Up Code"
        />
      </div>

      <div className="mt-2">
        <label className="credit-card-label">Payment Type</label>
        <select
          value={paymentType}
          onChange={handlePaymentTypeChange}
          className="border p-2 w-full text-black rounded-lg"
        >
          <option value="paymentWithOrder">Payment with Running Order</option>
          <option value="paymentWithProductOnHand">Payment with Product on Hand</option>
        </select>
      </div>
    </div>

            <div>
              <label className="credit-card-label">Name on card</label>
              <input
                type="text"
                className="form-control credit-inputs text-black bg-slate-200 w-full h-8 rounded-md p-2"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="credit-card-label">Card number</label>
              <input
                type="text"
                className="form-control credit-inputs text-black bg-slate-200 w-full h-8 rounded-md p-2"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="row flex gap-5">
              <div className="col-md-6">
                <label className="credit-card-label">Date</label>
                <input
                  type="date"
                  className="form-control credit-inputs text-black bg-slate-200 w-full h-8 rounded-md p-2"
                  placeholder="12/24"
                />
              </div>
              <div className="col-md-6">
                <label className="credit-card-label">CVV</label>
                <input
                  type="text"
                  className="form-control credit-inputs text-black bg-slate-200 w-full h-8 rounded-md p-2 "
                  placeholder="342"
                />
              </div>
            </div>
            <hr className="line my-4 border-t border-white" />
            <div className="flex justify-between items-center information">
              <span>Subtotal</span>
              <span>৳ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center information">
              <span>Shipping</span>
              <span>৳ {shipping}</span>
            </div>
            <div className="flex justify-between items-center information">
              <span>Total(Incl. taxes)</span>
              <span>৳ {total + shipping} </span>
            </div>
            <button
              className="btn btn-primary btn-block flex justify-between mt-3"
              type="button"
            >
              <span>৳ {total + shipping}.00</span>
              <span>
                Checkout<i className="fa fa-long-arrow-right ml-1 even:"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
