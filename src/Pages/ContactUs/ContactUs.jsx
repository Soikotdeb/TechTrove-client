
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_6d23e9z', 'template_ezdnv6i', form.current, 'A1Zs33WiuGDuR3oV-')
      .then((result) => {
        console.log(result.text);
        toast.success('Message sent successfully!', { autoClose: 3000 });
        form.current.reset(); // Reset the form fields
      })
      .catch((error) => {
        console.log(error.text);
        toast.error('Failed to send message!', { autoClose: 3000 });
      });
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full sm:w-2/3 mx-auto p-4 sm:p-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/2 pr-0 sm:pr-4">
            <div className="col-lg-5 d-flex align-items-stretch">
              <div className="info">
                <div className="address mb-4">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>Bangladesh, Sylhet, Moulvibazar</p>
                </div>

                <div className="email mb-4">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>sdsoikot424@gmail.com</p>
                </div>

                <div className="phone mb-4">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+88 01795474430</p>
                </div>

                <div className="border border-gray-400 rounded">
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?q=Moulvibazar,+Bangladesh&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                    frameBorder="0"
                    style={{ border: '0', width: '100%', height: '290px' }}
                    allowFullScreen
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="sm:w-1/2 pl-0 sm:pl-4">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form ref={form}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="user_name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Link
                  onClick={sendEmail}
                  className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition duration-300"
                  type="button"
                >
                  <FaPaperPlane className="inline-block mr-1" />Send
                </Link>
              </div>
            </form>
            <Link
              to="/"
              className="mt-4 bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition duration-300"
            >
              <FaArrowLeft className="inline-block mr-1" />GO BACK
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
