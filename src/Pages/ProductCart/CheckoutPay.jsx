import React from 'react';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaArrowLeft } from 'react-icons/fa';
import { CardElement } from '@stripe/react-stripe-js';

const stripePublicKey = import.meta.env.VITE_PAYMENT;
const stripePromise = loadStripe(stripePublicKey);

const CheckoutPay = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle Stripe payment submission logic here
  };
  
  const selectedProduct = localStorage.getItem('SelectedProduct');
  const parsedSelectedProduct = JSON.parse(selectedProduct);
  const TotalAmount = localStorage.getItem('TotalAmount');

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Link to="/productCart" className="flex items-center gap-1 text-blue-500 hover:underline">
          <FaArrowLeft /> Continue Payment
        </Link>
      </div>

      <div className="mt-6">
        <p className='mb-3 text-lg'><small>Total Amount: ৳{TotalAmount}.00</small></p>
        <div className="w-96 mx-auto border rounded p-2">
          <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full" type="submit">
                Pay Now!
              </button>
            </form>
          </Elements>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <div className="flex justify-between w-44">
            <img
              src="https://i.ibb.co/vxgjPv5/bkash1.png" 
              alt="Bkash"
              className="w-12 h-12 rounded-md transition duration-300 transform hover:rounded-full hover:scale-110 cursor-pointer"
            />
            <img
              src="https://i.ibb.co/YLML4Vh/nagad.jpg"
              alt="Nagad"
              className="w-12 h-12 rounded-md transition duration-300 transform hover:rounded-full hover:scale-110 cursor-pointer"
            />
            <img
              src="https://i.ibb.co/j31xJmY/roket.jpg" 
              alt="Roket"
              className="w-12 h-12 rounded-md transition duration-300 transform hover:rounded-full hover:scale-110 cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500">
          <p>Bkash, Nagad, Roket payment systems are coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPay;
