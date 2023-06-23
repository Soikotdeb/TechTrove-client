import Banner from "../Banner/Banner";
import Message from "../Message/Message";
import TechTroveProducts from "../TechTroveProducts/TechTroveProducts";

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
    </div>
  );
};

export default Home;
