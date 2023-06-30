import Banner from "../Banner/Banner";
import Facility from "../Facility/Facility";
import Message from "../Message/Message";
import TechTroveProducts from "../TechTroveProducts/TechTroveProducts";
import PartnarBrands from './../PartnersBrand/PartnarBrands';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="lg:p-8">
        <TechTroveProducts></TechTroveProducts>
      </div>
      <div className="lg:p-8">
      <Message></Message>
      </div>
      <div className="lg:p-8">
      <Facility></Facility>
      </div>
      <div className="lg:p-8">
      <PartnarBrands></PartnarBrands>
      </div>
     
    </div>
  );
};

export default Home;
