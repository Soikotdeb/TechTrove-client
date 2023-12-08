
import React, { useContext, useState } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CheckoutPay = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  const [invoiceData, setInvoiceData] = useState({
    SubTotalAmount: localStorage.getItem('SubTotalAmount'),
    ShippingAmount: localStorage.getItem('ShippingAmount'),
    TotalAmount: localStorage.getItem('TotalAmount'),
  });


  // Logic for downloading invoice details and generating PDF
  const handleDownloadInvoice = () => {
    const invoice = document.getElementById('invoiceContent');
    const downloadButton = document.getElementById('downloadButton');
    
    // Hide the download button before capturing the content for the PDF
    downloadButton.style.display = 'none';
  
    html2canvas(invoice).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      // Show the download button again after capturing the content for the PDF
      downloadButton.style.display = 'block';
  
      pdf.save('TechTrove/invoice.pdf');
    });
  };


  


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    // Fetch product and amount data
    const selectedProduct = localStorage.getItem('SelectedProduct');
    const parsedSelectedProduct = JSON.parse(selectedProduct);
    const TotalAmount = localStorage.getItem('TotalAmount');

    // Create a payment intent on your server
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(TotalAmount) * 100, // Convert amount to cents
        products: parsedSelectedProduct, // Send product details to the server if needed
      }),
    });

    const { clientSecret } = await response.json();

    // Confirm the card payment with the clientSecret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: result.error.message,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      setProcessing(false);
setTransactionId(result.paymentIntent.id);


// Collect form data
const formData = {
  address: document.getElementById('address').value,
  zipCode: document.getElementById('zipCode').value,
  country: document.getElementById('country').value,
  transactionId: result.paymentIntent.id,
  userEmail: user?.email,
  userName: user?.displayName,
  userImage: user?.photoURL,
  products: parsedSelectedProduct,
};

// Send form data to server
try {
  const response = await fetch('http://localhost:5000/save-payment-details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    // Handle successful response from server
    // E.g., display success message to user
    console.log('Payment details successfully saved on server!');
  } else {
    // Handle error response from server
    console.error('Failed to save payment details on server');
  }
} catch (error) {
  console.error('Error occurred while sending data to server:', error);
}


// Delete data based on user email------------------>
const deleteResponse = await fetch('http://localhost:5000/delete-user-data', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ userEmail: formData.userEmail }),
});

if (deleteResponse.ok) {
  // Data deleted successfully...
  console.log('User data deleted from the server');
} else {
  // Handle delete error...
  console.error('Failed to delete user data from the server');
}

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Thank you for your payment!',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then(() => {
        // Disable the "Pay Now" button after successful payment
        const payButton = document.getElementById('payButton');
        if (payButton) {
          payButton.disabled = true;
        }
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex items-center mb-4">
        <Link to="/productCart" className="flex items-center gap-1 text-blue-500 hover:underline">
          <FaArrowLeft /> Continue Payment
        </Link>
      </div>

{/* payment card */}

      <div className='w-1/2 mx-auto'>
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
    
   <div className='mt-3'>
     {/* Address Input */}
     <div className="mb-4">
      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
        Address
      </label>
      <input
        type="text"
        id="address"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your address (Must include Upozila)"
      />
    </div>

    {/* Zip Code Input */}
    <div className="mb-4">
      <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">
       UP Zip Code
      </label>
      <input
      required
        type="number"
        id="zipCode"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your Up zip code"
      />
    </div>

    {/* Country Select Input */}
    <div className="mb-6">
      <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
        Country
      </label>
      <select
        id="country"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {/* Options for country */}
        <option value="Bangladesh">Bangladesh</option>
        <option value="India">India</option>
      </select>
    </div>

   </div>
    <button
          id="payButton"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          type="submit"
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Pay Now!'}
        </button>
        {error && <div className="text-red-500">{error}</div>}
  </form>
</div>





      {/* invoice content */}
<div  id="invoiceContent">
  {transactionId && (
    <div className="mt-8 p-4 border border-gray-300 rounded">
      <div className="flex justify-between mb-4">
        <div>
        <p className="text-blue-600 text-lg">TechTrove<span className='text-red-600'>/</span><span className='text-purple-600'>GadgetBazaar</span> </p>

          <p><Link href="mailto:sdsoikot424@gmail.com">sdsoikot424@gmail.com</Link></p>
          <p>01795474430</p>
          <p>Sylhet Division,Moulvibazar,Sreemangal</p>
          <p>3214</p>
        </div>
      </div>
      <p>----------------Customer Payment Details----------------</p>
      <div className="flex items-center mb-2">
        <div>
          <p className="font-bold">Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <p>Address: {document.getElementById('address').value}</p>
          <p>Upozila zipCode: { document.getElementById('zipCode').value}</p>
          <p>Country: {document.getElementById('country').value}</p>
        </div>
      </div>
      <p className="text-green-600">
        <small>Transaction Successful With Transaction_Id: {transactionId}</small>
      </p>
      <div>
        <p className="text-green-600">
          <small>SubTotalAmount: {invoiceData.SubTotalAmount} /BDT</small>
        </p>
        <p className="text-green-600">
          <small>ShippingCharge: {invoiceData.ShippingAmount} /BDT</small>
        </p>
        <hr className=" border-t border-blue-500 w-1/2 mt-2" />
        <p className="text-green-600">
          <small>Total Amount: {invoiceData.TotalAmount} /BDT Only</small>
        </p>
      </div>
      <hr className="my-4" />
      <p className="mb-4">Thank you for purhes the product. We appreciate your trust in our services.</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleDownloadInvoice}
        id="downloadButton"
      >
        Download Invoice
      </button>
    </div>
  )}
</div>

{/* another payment */}
      <div>
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
