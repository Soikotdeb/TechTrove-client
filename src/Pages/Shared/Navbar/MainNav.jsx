
import { BiSearch } from "react-icons/bi";
import { FaExchangeAlt, FaFileAlt, FaHeart, FaShare, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { useContext, useState } from "react";
import logo from "../../../assets/image/company logo.png";
import { AuthContext } from "../../../Provider/AuthProvider";
import { RiDashboardFill } from "react-icons/ri"; // Remix Icon icons
import { FiSettings, FiUserPlus } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineUser } from "react-icons/ai";


const MainNav = () => {
  const { user, logOut } = useContext(AuthContext);
const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility


  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-semibold">
      <div className="navbar bg-gray-200 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
              <li>
                <a>
                  <FaHeart className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a>
                  <FaShoppingCart className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a>
                  <FaExchangeAlt className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
          <img className="w-9 h-12 rounded" src={logo} alt="" />
          <a className="btn btn-ghost hidden md:block normal-case text-4xl hover:text-purple-600">
            <p className="text-red-500 hover:text-red-600 flex">Tech <p className="text-red-600 hover:text-red-700">Trove</p> </p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Type here"
              className="border-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option disabled selected>
                Category?
              </option>
              <option>Nokia</option>
              <option>Huawei</option>
              <option>iPhone</option>
              <option>MacBook</option>
              <option>Google</option>
              <option>Xiaomi</option>
              <option>Vivo</option>
              <option>Samsung</option>
              <option>OnePlus</option>
              <option>Oppo</option>
            </select>
            <button className="btn px-2 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300">
              <BiSearch className="w-6 h-6 text-white" />
            </button>
          </div>
            <ul className="menu menu-horizontal flex items-center gap-4">
            <li>
              <Link>
                <FaHeart className="w-6 h-6  hover:text-purple-700 transition-colors duration-300" />
              </Link>
            </li>
            <li>
              <Link>
                <FaShoppingCart className="w-6 h-6  hover:text-purple-700 transition-colors duration-300" />
              </Link>
            </li>
            <li>
              <Link>
                <FaExchangeAlt className="w-6 h-6  hover:text-purple-700 transition-colors duration-300" />
              </Link>
            </li>
          </ul>

        </div>

        {user&& <div className="me-2">
          <Link to={'dashboard/welcome'} className="lg:text-lg items-center flex ml-3 font-bold hover:text-purple-500">
            <RiDashboardFill />
           <p className="text-lg"> Dashboard</p>
          </Link>
        </div>}


        <Link onClick={openModal}  className="lg:ml-3 ">
          {user && (
            <div
              title={user.displayName || "Not Available User Name"}
              className="avatar online"
            >
              <div className="w-9 rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            </div>
          )}
        </Link>

        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white rounded-lg p-8 transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-500">
            <ul className="grid gap-4">
              <div>
              <li>
                <p className="text-center">--------- All Account ---------</p>
                <p className="flex items-center gap-1"><FaUserCircle/> {user.displayName } <Link className= " ms-4 hover:text-green-400 border p-y-2 text-green-300"><small>Switch</small></Link> </p>
              </li>
              <hr className="border-t-4 border-white mt-2" />
              </div>
              <li>
                <Link to="/add-account"> <p className="flex items-center gap-1 hover:text-purple-200"><FiUserPlus className="w-6 h-6" />Add More Account</p> </Link>
              </li>
              <li>
                <Link to="/profile"> <p className="flex items-center gap-1 hover:text-purple-200"> <AiOutlineUser className="w-4 h-4" />Update Profile</p> </Link>
              </li>
              <li>
                <Link to="/settings"> <p className="flex items-center gap-1 hover:text-purple-200"><FiSettings className="w-4 h-4 " /> Settings</p></Link>
              </li>
              <li>
                <Link to="/invite"> <p className="flex items-center gap-1 hover:text-purple-200"><FaShare></FaShare>Invite Friend </p></Link>
              </li>

              <li>
                <Link to="/terms"> <p className="flex items-center gap-1 hover:text-purple-200"> <FaFileAlt className="w-4 h-4" /> terms and conditions</p></Link>
              </li>

            </ul>
            <button onClick={closeModal} className="btn bg-red-100 mt-4 w-full hover:bg-red-300">
            <AiOutlineCloseCircle className="w-6 h-6 text-red-400 hover:text-red-800" />
            </button>
          </div>
        </div>
      )}
        

        <div className="navbar-end ms-10">
          {user ? (
            <Link onClick={handleLogout} className="btn hover:text-purple-500">
              LogOut <HiOutlineLogout className="ml-1 w-5 h-5" />
            </Link>
          ) : (
            <Link to="/logIn" className="btn hover:text-purple-500">
              LogIn <HiOutlineLogin className="ml-1 w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;

