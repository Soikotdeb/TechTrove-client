
import video from '../../assets/image/welcome-animation.mp4'


const WelcomePage = () => {
  return (
    <div className=" w-full flex justify-center items-center h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="top-0 left-0 lg:w-full lg:h-full h-[545px] object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      
    </div>
  );
};

export default WelcomePage;


