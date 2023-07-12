
import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp, FaFacebookMessenger } from 'react-icons/fa';
import Banner from './../Banner/Banner';
import TechTroveProducts from './../TechTroveProducts/TechTroveProducts';
import Message from './../Message/Message';
import Facility from './../Facility/Facility';
import ShopBySection from './../ShopBySection/ShopBySection';
import PartnarBrands from './../PartnersBrand/PartnarBrands';
import { Link } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const toggleMessengerVisibility = () => {
    if (window.pageYOffset > 600) {
      setIsMessengerVisible(true);
    } else {
      setIsMessengerVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', toggleMessengerVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', toggleMessengerVisibility);
    };
  }, []);

  const openMessenger = () => {
    const messengerURL = 'https://m.me/sd.soikot.9?text=Hi Sir do you available now?';
    window.open(messengerURL, '_blank');
  };

  return (
    <div>
      <div className={`fixed bottom-4 right-4 z-50 ${isVisible ? 'block' : 'hidden'}`}>
        <button
          className="bg-gray-800  text-white rounded-full p-3 focus:outline-none hover:opacity-70"
        >
          <Link onClick={scrollToTop}>
            <FaArrowCircleUp title='Click To Go Page Top' size={30} />
          </Link>
        </button>
      </div>

      <div className={`fixed bottom-20 right-4 z-50 ${isMessengerVisible ? 'block' : 'hidden'}`}>
        <button className="bg-blue-500 text-white rounded-full p-3 focus:outline-none hover:opacity-70">
          <Link onClick={openMessenger}>
            <FaFacebookMessenger title='Support TechTrove Team' size={30} />
          </Link>
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <ScrollToTop />
      <div className="bg-slate-200">
        <Banner></Banner>
      </div>
      <div className="lg:p-8 bg-slate-200">
        <TechTroveProducts></TechTroveProducts>
      </div>
      <div className="lg:p-8 bg-slate-200">
        <Message></Message>
      </div>
      <div className="lg:p-8 bg-slate-200">
        <Facility></Facility>
      </div>
      <div className="lg:p-8 bg-slate-200 mt-2">
        <ShopBySection></ShopBySection>
      </div>
      <div className="lg:p-8 bg-slate-200 mt-2">
        <PartnarBrands></PartnarBrands>
      </div>
    </div>
  );
};

export default Home;
