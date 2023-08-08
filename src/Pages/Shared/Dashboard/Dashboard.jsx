import { Link, NavLink, Outlet } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { IoMdSchool, IoIosSchool, IoIosCash } from "react-icons/io";
import { BiPlus, BiCog } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../../assets/image/company logo.png";
import UseAdmin from "../../../Hook/UseAdmin";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Dashboard = () => {
  const [isAdminOrInstructor, isAdminOrInstructorLoading] = UseAdmin();
  const { loading } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentTime.getDay()];

  if (loading || isAdminOrInstructorLoading) {
    return (
      // <div className="flex justify-center items-center h-screen">
      //   <div className="flex flex-col items-center">
      //     <div className="animate-pulse rounded-full p-8 border-8 border-red-400">
      //       <div className="border-4 border-green-200 h-16 w-16 rounded-full"></div>
      //     </div>
      //     <p className="mt-4 text-red-400 font-semibold">
      //       Content is loading...
      //     </p>
      //   </div>
      // </div>
      <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="flex flex-col items-center">
          <div className="border-t-4 border-red-500 w-12 h-12 animate-spin rounded-full"></div>
          <p className="mt-4 text-red-400 font-semibold">
            Content is loading...
          </p>
        </div>
      </div>
    );
  }

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
      {isAdminOrInstructor === "admin" && (
        <div className="drawer-side">
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
                <p className="text-red-500 text-3xl ml-2 hover:text-red-600 flex">
                  Tech <p className="text-red-600 hover:text-red-700">Trove</p>{" "}
                </p>
              </div>
            </p>

            <li>
              <NavLink className="hover:text-red-400" to="/">
                {" "}
                <AiOutlineHome size={24} />
                Back To Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-red-400"
                to="/dashboard/ManageUsers"
              >
                {" "}
                <BsPeopleFill size={24} />
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-red-400"
                to="/dashboard/ManageClasses"
              >
                <BiCog size={24} />
                Manage Classes
              </NavLink>
            </li>

            <div className="absolute bottom-10 left-0 right-0">
              <p className="text-center text-gray-400 mt-2">
                {currentTime.toLocaleString()} ({dayOfWeek})
              </p>
              <p className="text-center text-gray-400">
              
                <span className="text-orange-500 hover:text-orange-600">
                &copy;  tech 
                </span>
                <span className="text-orange-700 hover:text-orange-800">
                  Trove
                </span>{" "}
                 All rights reserved
              </p>
            </div>

          </ul>
        </div>
      )}
      {/* instructor Dashboard */}
      {isAdminOrInstructor === "instructor" && (
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full text-white bg-gray-900  font-bold text-1xl">
            <div className="flex items-center">
            <p className="text-orange-600 font-bold text-2xl mb-4">
              <div className="flex items-center">
                <img
                  className="w-9 h-12 rounded-2xl"
                  title="TechTrove GadgetBazar"
                  src={logo}
                  alt=""
                />{" "}
                <p className="text-red-500 text-3xl ml-2 hover:text-red-600 flex">
                  Tech <p className="text-red-600 hover:text-red-700">Trove</p>{" "}
                </p>
              </div>
            </p>
            </div>
            <li>
              <NavLink className="hover:text-red-400" to="/">
                {" "}
                <AiOutlineHome size={24} />
                Back To Instructor Home
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-red-400" to="/dashboard/AddProducts">
                {" "}
                <BiPlus size={24} />
                Add a Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-red-400"
                to="/dashboard/MyClasses"
                activeClassName="active"
              >
                <IoMdSchool size={24} />
                My Classes
              </NavLink>
            </li>

            <div className="absolute bottom-10 left-0 right-0">
              <p className="text-center text-gray-400 mt-2">
                {currentTime.toLocaleString()} ({dayOfWeek})
              </p>
              <p className="text-center text-gray-400">
                <span className="text-orange-500 hover:text-orange-600">
                &copy;  tech
                </span>
                <span className="text-orange-700 hover:text-orange-800">
                  Trove
                </span>{" "}
                 All rights reserved
              </p>
            </div>

          </ul>
        </div>
      )}
      {/* user Dashboard */}
      {isAdminOrInstructor === "user" && (
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
                <p className="text-red-500 text-3xl ml-2 hover:text-red-600 flex">
                  Tech <p className="text-red-600 hover:text-red-700">Trove</p>{" "}
                </p>
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
                  <p className="font-bold inline-block hover:text-red-400">
                    My Cart
                  </p>
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
              <NavLink className="hover:text-red-400" to="/dashboard/">
                {" "}
                <IoIosSchool size={24} />
                My Selected Classes
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-red-400" to="/dashboard/">
                {" "}
                <IoIosCash size={24} />
                payment history{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-red-400" to="/dashboard/">
                {" "}
                <FaChalkboardTeacher size={24} />
                My Enrolled Classes
              </NavLink>
            </li>

            <div className="absolute bottom-10 left-0 right-0">
              <p className="text-center text-gray-400 mt-2">
                {currentTime.toLocaleString()} ({dayOfWeek})
              </p>
              <p className="text-center text-gray-400">
                <span className="text-orange-500 hover:text-orange-600">
                &copy;  tech
                </span>
                <span className="text-orange-700 hover:text-orange-800">
                  Trove
                </span>{" "}
                 All rights reserved
              </p>
            </div>

          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
