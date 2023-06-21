
import { Outlet } from 'react-router-dom';
import Navbar from './../Pages/Shared/Navbar/Navbar';
import Footer from './../Pages/Shared/Footer/Footer';
import MainNav from '../Pages/Shared/Navbar/MainNav';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <MainNav></MainNav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;