import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const queryClient = new QueryClient();

// Retrieve your Stripe public key from the environment variable
const stripePublicKey = import.meta.env.VITE_PAYMENT;
// Make sure the stripePublicKey is properly set in your environment
const stripePromise = loadStripe(stripePublicKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='px-1'>
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
    </AuthProvider>
    <ToastContainer />
    </Elements>
  </React.StrictMode>,
)


