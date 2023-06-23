import Banner from "../Banner/Banner";
import TechTroveProducts from "../TechTroveProducts/TechTroveProducts";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="">
            <TechTroveProducts></TechTroveProducts>
            </div>
        </div>
    );
};

export default Home;