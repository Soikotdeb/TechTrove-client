import Banner from "../Banner/Banner";
import TechTroveProducts from "../TechTroveProducts/TechTroveProducts";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="lg:p-8 ">
  <TechTroveProducts></TechTroveProducts>
</div>

        </div>
    );
};

export default Home;