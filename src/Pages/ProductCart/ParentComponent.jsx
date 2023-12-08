
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPay from './CheckoutPay';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const ParentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPay />
    </Elements>
  );
};

export default ParentComponent;
