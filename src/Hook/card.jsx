// import React from 'react';

// const TechTroveProducts = () => {
//   return (
//     <div className="max-w-md mx-auto">
//       <div className="bg-gray-400 antialiased text-gray-900">
//         <div>
//           <img
//             src="https://source.unsplash.com/random/350x350"
//             alt="random image"
//             className="w-full h-56 object-cover object-center rounded-lg shadow-md"
//           />

//           <div className="relative px-3 -mt-10">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <div className="flex items-baseline">
//                 <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
//                   New
//                 </span>
//                 <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
//                   2 baths &bull; 3 rooms
//                 </div>
//               </div>

//               <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">A random Title</h4>

//               <div className="mt-1">
//                 $1800
//                 <span className="text-gray-600 text-sm"> /wk</span>
//               </div>
//               <div className="mt-4">
//                 <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
//                 <span className="text-sm text-gray-600">(based on 234 ratings)</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechTroveProducts;




// import React, { useState, useEffect, useContext } from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { AuthContext } from '../../Provider/AuthProvider';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// const CheckoutForm = () => {
//   const { user } = useContext(AuthContext);
//   const [stripe, setStripe] = useState(null);
//   const [elements, setElements] = useState(null);
//   const [cardError, setCardError] = useState(null);
//   const [cardComplete, setCardComplete] = useState(false);

//   useEffect(() => {
//     const loadStripe = async () => {
//       if (window.Stripe) {
//         setStripe(window.Stripe('YOUR_STRIPE_PUBLIC_KEY'));
//         setElements(window.Stripe('YOUR_STRIPE_PUBLIC_KEY').elements());
//       } else {
//         const stripeScript = document.createElement('script');
//         stripeScript.src = 'https://js.stripe.com/v3/';
//         stripeScript.async = true;
//         stripeScript.onload = () => {
//           setStripe(window.Stripe('YOUR_STRIPE_PUBLIC_KEY'));
//           setElements(window.Stripe('YOUR_STRIPE_PUBLIC_KEY').elements());
//         };
//         document.head.appendChild(stripeScript);
//       }
//     };

//     loadStripe();
//   }, []);

//   const handleCardChange = (event) => {
//     if (event.error) {
//       setCardError(event.error.message);
//     } else {
//       setCardError(null);
//     }
//     setCardComplete(event.complete);
//   };

//   const handleSubmit = async () => {
//     if (!stripe || !elements) {
//       console.error('Stripe.js has not loaded yet.');
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { token, error } = await stripe.createToken(cardElement);

//     if (error) {
//       console.error(error);
//       // Handle error
//       return;
//     }

//     // Send the token to your server to complete the charge
//     const response = await fetch('/api/charge', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token: token.id,
//         amount: 1000, // Replace with the actual amount in cents
//         description: 'Payment for Product',
//         email: user?.email,
//       }),
//     });

//     if (response.ok) {
//       // Payment success
//       // You may want to show a success message to the user
//       console.log('Payment success!');
//     } else {
//       console.error('Payment failed');
//       // Handle payment failure
//     }
//   };

//   return (
//     <div>
//       <Elements stripe={stripePromise}>
//         <div>
//           <label>Card details</label>
//           <div>
//             <CardElement options={{}} onChange={handleCardChange} />
//           </div>
//           {cardError && <p>{cardError}</p>}
//         </div>
//         <button
//           type="button"
//           disabled={!cardComplete}
//           onClick={handleSubmit}
//         >
//           Pay
//         </button>
//       </Elements>
//     </div>
//   );
// };

// export default CheckoutForm;
