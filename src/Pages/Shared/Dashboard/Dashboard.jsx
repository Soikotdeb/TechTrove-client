import { Link, NavLink, Outlet } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { IoMdSchool, IoIosSchool, IoIosCash } from "react-icons/io";
import { BiPlus, BiCog } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../../assets/image/company logo.png";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className=" btn btn-primary drawer-button lg:hidden bg-green-500 flex items-center font-semibold hover:text-purple-300 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300 mb-2 mt-2"
        >
          Open drawer
        </label>
      </div>

      {/* Admin Dashboard */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-gray-300 text-base-content font-bold text-1xl">
          <p className="text-orange-600 font-bold text-3xl mb-4">
            Welcome to Admin Dashboard
          </p>
          <li>
            <NavLink to="/">
              {" "}
              <AiOutlineHome size={24} />
              Back To Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ManageUsers">
              {" "}
              <BsPeopleFill size={24} />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ManageClasses">
              <BiCog size={24} />
              Manage Classes
            </NavLink>
          </li>
        </ul>
      </div>

      {/*   Instructor Dashboard */}

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-white bg-gray-900  font-bold text-1xl">
        <div className="flex items-center">
              <img
                className="w-9 h-12 rounded-2xl"
                title="TechTrove GadgetBazar"
                src={logo}
                alt=""
              />{" "}
              <p className="text-3xl ml-2">Tech <p className="text-red-300">Trove</p> </p>
            </div>
          <li>
            <NavLink to="/">
              {" "}
              <AiOutlineHome size={24} />
              Back To Instructor Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/AddClass">
              {" "}
              <BiPlus size={24} />
              Add a Class
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/MyClasses" activeClassName="active">
              <IoMdSchool size={24} />
              My Classes
            </NavLink>
          </li>
        </ul>
      </div>

      {/* user dashboard */}

      <div className="drawer-side text-white">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-white bg-gray-900  font-bold text-1xl">
          <p className="text-orange-600 font-bold text-2xl mb-4">
            <div className="flex items-center">
              <img
                className="w-9 h-12 rounded-2xl"
                title="TechTrove GadgetBazar"
                src={logo}
                alt=""
              />{" "}
              <p className="text-red-500 text-3xl ml-2 hover:text-red-600 flex">Tech <p className="text-red-600 hover:text-red-700">Trove</p> </p>
            </div>
          </p>
          <Link to="/dashboard/selectedClass">
            <div className="flex justify-start items-center  ml-3">
              <div className="relative ">
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"></span>
                <FiShoppingCart
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  size={25}
                />
              </div>

              <li>
                {" "}
                <p className="font-bold inline-block hover:text-red-400">My Cart</p>
              </li>
            </div>
          </Link>
          <li>
            <NavLink className="hover:text-red-400" to="/">
              {" "}
              <AiOutlineHome size={24} />
              Back To User Home
            </NavLink>
          </li>
          <li>
            <NavLink  className="hover:text-red-400" to="/dashboard/">
              {" "}
              <IoIosSchool size={24} />
              My Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink  className="hover:text-red-400" to="/dashboard/">
              {" "}
              <IoIosCash size={24} />
              payment history{" "}
            </NavLink>
          </li>
          <li>
            <NavLink  className="hover:text-red-400" to="/dashboard/">
              {" "}
              <FaChalkboardTeacher size={24} />
              My Enrolled Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
