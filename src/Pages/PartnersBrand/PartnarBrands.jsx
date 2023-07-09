
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './Partner.css'
 import huawei from '../../assets/image/huawei-logo-communication-13-e1593284031516.png';
 import nokia from '../../assets/image/nokia-logo.png';
 import vivo from '../../assets/image/vivo.png';
 import xiaomi from '../../assets/image/xiaomi-mi-a1.png';
 import google from '../../assets/image/google-icon-logo-png-transparent.png';
 import oppo from '../../assets/image/list-image-e1595110275997.jpeg';
 import samsung from '../../assets/image/samsung_logo_PNG10.png';
 import onePlus from '../../assets/image/oneplus-logo-B6703954CF-seeklogo.com_-1.png';
 import iPhone from '../../assets/image/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4-2-e1593283971693.png';



// import required modules
import { Pagination } from "swiper";

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <>
    <div>
    <h1 className="text-3xl font-semibold text-center">OUR PARTNERS BRAND </h1>
    </div>
     <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper mt-4"
      >
        <SwiperSlide>
          <img src={huawei} alt="" style={{ width: "200px", height: "200px",marginBottom:'35px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={nokia} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={onePlus} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={oppo} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={samsung} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={vivo} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={google} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={iPhone} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={xiaomi} alt="" style={{ width: "200px", height: "200px" }} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}