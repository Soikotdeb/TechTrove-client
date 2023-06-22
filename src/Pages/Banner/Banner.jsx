
import { FaSuitcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import image1 from '../../assets/image/shopping mall.jpg';
import image2 from '../../assets/image/Mall_kiosk.jpg';
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

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse">
      <div className="flex-1 mt-2 ml-4">
        <div className="navbar bg-base-100 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center mb-3 sm:mb-0">
            <Link className="normal-case text-xl">HOT OFFER |</Link>
          </div>
          <div className="flex items-center mb-3 sm:mb-0 ml-0 sm:ml-3">
            <Link className="normal-case text-xl">IPHONE OFFER |</Link>
          </div>
          <div className="flex-1 mb-3 sm:mb-0 ml-0 sm:ml-3">
            <Link className="normal-case text-xl">GADGET OFFER</Link>
          </div>
          <div className="flex-none">
            <p>HelpLine: +88 01795474430</p>
          </div>
        </div>

        <div className="carousel h-1/2 w-full border">
          <div id="slide1" className="carousel-item relative w-full">
          <img src={image2} className="w-full" alt="" />
           
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
          <img src={image1} className="w-full" alt="" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-96 border border-gray-200 p-3">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" checked />
          <div className="collapse-title text-xl bg-orange-700 text-white font-bold">
            Browse Categories
          </div>

          <div className="p-4">
            <Link className="flex items-center border p-1 hover:bg-gray-100">
              <img className="w-8 h-9" src={MacBook} alt="" />
              <p className="ml-2">MacBook</p>
            </Link>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={iPhone} alt="" />
                <p className="ml-2">iPhone</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={huawei} alt="" />
                <p className="ml-2">Huawei</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={nokia} alt="" />
                <p className="ml-2">Nokia</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={onePlus} alt="" />
                <p className="ml-2">OnePlus</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={samsung} alt="" />
                <p className="ml-2">Samsung</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={vivo} alt="" />
                <p className="ml-2">Vivo</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={xiaomi} alt="" />
                <p className="ml-2">Xiaomi</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={google} alt="" />
                <p className="ml-2">Google</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <img className="w-8 h-9" src={oppo} alt="" />
                <p className="ml-2">Oppo</p>
              </Link>
            </div>

            <div>
              <Link className="flex items-center border p-1 hover:bg-gray-100">
                <FaSuitcase />
                <p className="ml-2">Accessories</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
