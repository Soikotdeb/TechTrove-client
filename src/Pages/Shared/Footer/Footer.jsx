
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import logo from '../../../assets/image/company logo.png'
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import pay from '../../../assets/image/SSL-Commerz-Pay-With-logo-All-Size-01-004.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto  py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
          <img className='w-9 h-12 mr-3 rounded' src={logo} alt="" />
            <span className="font-semibold text-4xl ">TechTrove</span>
          </div>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap justify-center">
              <li className="mx-2">
                <p  className="text-gray-400 text-2xl font-bold hover:text-white">Contact</p>
                <div>
                    <p>MoulviBazar, Bangladesh</p>
      <p className="flex items-center">
        <span className="mr-2"><FaEnvelope /></span> Email: <a href="mailto:sdsoikot424@gmail.com">sdsoikot424@gmail.com</a>
      </p>
      <p className="flex items-center">
        <span className="mr-2"><FaPhone /></span> Phone: +88 01795474430
      </p>
    </div>
              </li>
              <li className="mx-2">
                <p className="text-gray-400 text-2xl font-bold hover:text-white">About</p>
                <p>* Contact Us</p>
                <p>* About Us</p>
                <p>* FAQs</p>
                <p>* Why Shop with us</p>
                <p>* Shipping & Courier</p>
                <p>* How to Place Order</p>
              </li>
              <li className="mx-2">

                <p className="text-gray-400 font-bold text-2xl hover:text-white">Our All Policy</p>
                <p>* Terms and Conditions</p>
                <p>* Privacy Policy</p>
                <p>* Warranty Policy</p>
                <p>* EMI Policy</p>
                <p>* Exchange Policy</p>
                <p>* Return and Replacement Policy</p>
              </li>
              <li className="mx-2">
                <p  className="text-gray-400 font-bold text-2xl hover:text-white">Let us help You</p>
                <p>* Track Order</p>
                <p>* Shopping Cart</p>
                <p>* Compare Product</p>
                <p>* EMI</p>
                <p>* Exchange</p>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-400">
            <p>Multibranded smartphone shop.</p>
            &copy; TechTrove 2020 CREATED BY <span className='text-orange-600'>TechTrove</span> Team
            <p>&copy; 2023 TechTrove All rights reserved.</p>


          </p>
        </div>
        <div className="mt-4 flex items-center justify-center">
       Pay With:   <img className='w-34 h-14' src={pay} alt="" />
        

          <div>
            
            <ul className="flex">
            <p className="text-sm text-gray-400 mr-2">Follow us: </p>
              <li className="mr-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaFacebook className="h-5 w-5" />
                </a>
              </li>
              <li className="mr-2">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaTwitter className="h-5 w-5" />
                </a>
              </li>
              <li className="mr-2">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </li>
              <li className="mr-2">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </li>
              <li className="mr-2">
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaGithub className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
