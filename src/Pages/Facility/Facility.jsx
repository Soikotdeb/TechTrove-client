
import exchange from '../../assets/image/mobile-exchange.webp';
import gadget from '../../assets/image/gadget.jpg';
import { Link } from 'react-router-dom';

const Facility = () => {
  return (
    <div className="flex  gap-2">
      <div
        className="relative column rounded-sm flex items-center justify-center"
        style={{
          backgroundImage: `url(${exchange})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '50%',
          transition: 'background-size 0.3s', // Added CSS transition
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundSize = '110%'; // Zoom in the background image on mouse enter
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundSize = 'cover'; // Reset the background image size on mouse leave
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="font-extrabold text-white z-10 text-center">
          <p>Trade in at TechTrove</p>
          <p className="text-3xl text-white">Exchange Facility</p>
          <p>We offer upgrade, swap & trade-in facility.</p>
          <div className="mt-6">
            <Link
              to=""
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
            >
               SHOP MORE
            </Link>
          </div>
        </div>
      </div>
      <div
        className="relative column rounded-sm flex items-center justify-center"
        style={{
          backgroundImage: `url(${gadget})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '50%',
          transition: 'background-size 0.3s', // Added CSS transition
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundSize = '110%'; // Zoom in the background image on mouse enter
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundSize = 'cover'; // Reset the background image size on mouse leave
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="font-extrabold text-white z-10 text-center">
          <p>Get your latest Gadget</p>
          <p className="text-3xl text-white">iWatch, AirPods, iPads & More</p>
          <p>We have a wide range of smart gadgets. <br />Buy online & get delivered today.</p>
          <div className="mt-6">
            <Link
              to=""
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
            >
           SHOP MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
