import React from 'react';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaArrowLeft } from 'react-icons/fa';
import { CardElement } from '@stripe/react-stripe-js';

// Retrieve your Stripe public key from the environment variable
const stripePublicKey = import.meta.env.VITE_PAYMENT;

// Make sure the stripePublicKey is properly set in your environment
const stripePromise = loadStripe(stripePublicKey);



const CheckoutPay = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle Stripe payment submission logic here
  };
  const selectedProduct = localStorage.getItem('SelectedProduct');
  const parsedSelectedProduct = JSON.parse(selectedProduct);
  
  const TotalAmount = localStorage.getItem('TotalAmount');
  return (
    <div>
      <div className="flex flex-row">
        <Link to="/productCart" className="flex items-center gap-1 hover:underline">
          <FaArrowLeft /> Continue Payment
        </Link>
      </div>
      <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 gap-4 p-2'>
  {parsedSelectedProduct.map(product => (
    <div key={product._id} className='grid-item'>
      <img className='w-full h-auto' src={product.image} alt={product.name} />
    </div>
  ))}
</div>


      <div>
        <p className='mb-5'><small>Total Amount: {TotalAmount}</small></p>
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
            <button className="btn btn-outline btn-accent mt-6 align-middle flex mx-auto" type="submit">
              Pay Now!
            </button>
          </form>
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPay;