import Banner from "../Banner/Banner";
import Facility from "../Facility/Facility";
import Message from "../Message/Message";
import TechTroveProducts from "../TechTroveProducts/TechTroveProducts";
import PartnarBrands from './../PartnersBrand/PartnarBrands';
import ShopBySection from './../ShopBySection/ShopBySection';


const Home = () => {
  return (
    <div>
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
