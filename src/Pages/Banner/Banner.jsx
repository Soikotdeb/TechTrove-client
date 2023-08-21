
import { FaFire, FaGripVertical, FaSuitcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MacBook from '../../assets/image/Apple-MacBook-15-inch-e1600416371601.jpeg';
import huawei from '../../assets/image/huawei-logo-communication-13-e1593284031516.png';
import nokia from '../../assets/image/nokia-logo.png';
import vivo from '../../assets/image/vivo.png';
import xiaomi from '../../assets/image/xiaomi-mi-a1.png';
import google from '../../assets/image/google-icon-logo-png-transparent.png';
import oppo from '../../assets/image/list-image-e1595110275997.jpeg';
import samsung from '../../assets/image/samsung_logo_PNG10.png';
import onePlus from '../../assets/image/oneplus-logo-B6703954CF-seeklogo.com_-1.png';
import iPhone from '../../assets/image/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4-2-e1593283971693.png';
import { AiOutlineMobile } from 'react-icons/ai';
import './Banner.css'
import { useEffect, useState } from 'react';



const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    'https://img.freepik.com/free-photo/sales-promotion-fashion-shopping-discount_53876-123615.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-photo/online-fashion-shopping-with-computer_23-2150400628.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-photo/beautiful-woman-sitting-home-with-electronic-devices-shopping-bags-credit-card-hand_23-2148101678.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-vector/online-shop-cartoon-poster-hand-give-shopping-bag_107791-7042.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-vector/online-shopping-concept-illustration-with-words-people_613284-2431.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34865.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-vector/gradient-omnichannel-illustration_23-2149333190.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',
    'https://img.freepik.com/free-photo/online-payment-purchase-e-commerce-buy-icon_53876-133903.jpg?size=626&ext=jpg&ga=GA1.2.2087522418.1672577037&semt=ais',






    // Add more image URLs if needed
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);
 
  return (
<div className='banner'>
<div className="flex flex-col lg:flex-row-reverse">
      <div className="flex-1 mt-1 ml-2 mr-2">
      <div className="navbar bg-base-100 flex flex-col sm:flex-row sm:justify-between sm:items-center font-semibold rounded-sm">
  <div className="flex items-center mb-3 sm:mb-0 relative hover:text-purple-500 ">
    <p className='mb-12 absolute'>
      <small className='bg-red-500 text-white font-bold p-1  rounded-sm'>BEST</small>
    </p> 
    <FaFire size={22} color="red" />
    <Link className="normal-case text-xl">HOT OFFER |</Link>
  </div>
  <div className="flex items-center mb-3 sm:mb-0 ml-0 sm:ml-3 hover:text-purple-500 relative">
  <p className='mb-12 absolute '>
      <small className='bg-green-400 text-white font-bold p-1  rounded-sm'>HOT</small>
    </p>
    <AiOutlineMobile size={22} color="black" />
    <Link className="normal-case text-xl">IPHONE OFFER |</Link>
  </div>
  <div className="flex-1 mb-3 sm:mb-0 ml-0 sm:ml-3 hover:text-purple-500 ">
  <p><FaGripVertical /></p>
    <Link className="normal-case text-xl "> GADGET OFFER</Link>
  </div>
  <div className="flex-none">
    <p>HelpLine: +88 01795474430</p>
  </div>
</div>

{/* banner */}
   <div className="relative w-full h-[478px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>

      </div>

      <div className="lg:w-96 border h-1/2 border-gray-200  p-3">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" checked />
          <div className="collapse-title text-xl bg-orange-700 text-white font-bold">
            Browse Categories
          </div>

          <div className="p-4">
          <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'MacBook'}`}>
    <img className="w-8 h-9" src={MacBook} alt="" />
    <p className="ml-2">MacBook</p>
</Link>
            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'iPhone'}`}>
                <img className="w-8 h-9" src={iPhone} alt="" />
                <p className="ml-2">iPhone</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Huawei'}`}>
                <img className="w-8 h-9" src={huawei} alt="" />
                <p className="ml-2">Huawei</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Nokia'}`}>
                <img className="w-8 h-9" src={nokia} alt="" />
                <p className="ml-2">Nokia</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'OnePlus'}`}>
                <img className="w-8 h-9" src={onePlus} alt="" />
                <p className="ml-2">OnePlus</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Samsung'}`}>
                <img className="w-8 h-9" src={samsung} alt="" />
                <p className="ml-2">Samsung</p>
              </Link>
            </div>

            <div> 
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Vivo'}`}>
                <img className="w-8 h-9" src={vivo} alt="" />
                <p className="ml-2">Vivo</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Xiaomi'}`}>
                <img className="w-8 h-9" src={xiaomi} alt="" />
                <p className="ml-2">Xiaomi</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Google'}`}>
                <img className="w-8 h-9" src={google} alt="" />
                <p className="ml-2">Google</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'Oppo'}`}>
                <img className="w-8 h-9" src={oppo} alt="" />
                <p className="ml-2">Oppo</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border gap-1 p-1 hover:font-extrabold hover:bg-gray-300" to={`/BrowsCategory/${'accessories'}`}>
                <FaSuitcase />
                <p className="ml-2">Accessories</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default Banner;


