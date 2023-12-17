
import { useState, useContext } from "react";
import { FaSearch, FaShoppingCart, FaHeart, FaExchangeAlt, FaUserCircle, FaShare, FaFileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { AiOutlineUser, AiOutlineCloseCircle } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FiUserPlus, FiSettings } from "react-icons/fi";
import { MdLiveHelp, MdLocalAtm } from "react-icons/md";
import useCart from "../../../Hook/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";
import logo from "../../../assets/image/company logo.png";
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';


const MainNav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart] = useCart();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  console.log(searchResult);
  const navigate = useNavigate();


  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("TechTrove-Access-token");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Add logic to send the search request to the server with the searchText
    // You may use a fetch or axios to make a GET request to your server endpoint
    // Replace 'YOUR_SERVER_ENDPOINT' with the actual endpoint for searching
    fetch(`https://tech-trove-gadget-bazar-database.vercel.app/searchByHomePage/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the search results as needed
        console.log("Search results:", data);
        // Save the search results in local storage
      localStorage.setItem('searchResults', JSON.stringify(data));
        setSearchResults(data)
       // Navigate to another route without a full page reload
       navigate('/HomeSearchResult'); 
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
<div>
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
                <Link to={'/productCart'} className="relative">
                  <FaShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                <div className="absolute top-2 left-4 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-xl w-5 h-3 flex items-center justify-center ">
                  {cart.length}
                </div>
              )}
                </Link>
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
            <p className="text-gray-500 hover:text-red-600 flex">
              Tech <p className="text-gray-600 hover:text-red-700">Trove</p>{" "}
            </p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-2 pr-10 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button type="submit" className="absolute top-1/2 right-4 transform -translate-y-1/2">
               <FaSearch className="text-gray-900" />
              </button>
            </div>
          </form>

          <ul className="menu menu-horizontal flex items-center gap-4">
            <li>
              <Link>
                <FaHeart className="w-6 h-6 text-gray-500 hover:text-purple-700 transition-colors duration-300" />
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/productCart"
                className="text-gray-500 hover:text-purple-700 transition-colors duration-300"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Link>
              {cart.length > 0 && (
                <div className="absolute top-0 right-1 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-xl w-2 h-2 flex items-center justify-center ">
                  {cart.length}
                </div>
              )}
            </li>

            <li>
              <Link>
                <FaExchangeAlt className="w-6 h-6 text-gray-500 hover:text-purple-700 transition-colors duration-300" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Link to="" title="Notifications">
            <MdNotificationsActive className="w-6 h-6 me-4 lg:ms-5 text-gray-500 hover:text-purple-700 transition-colors duration-300" />
          </Link>
        </div>

        <Link onClick={openModal} className="lg:ml-3 ">
          {user && (
            <div
              title={user.displayName || "Not Available User Name"}
              className="avatar online"
            >
              <div className="w-9 rounded-full border border-red-800">
                <img src={user?.photoURL} alt="User Profile" />
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
                    <p className="text-center">
                      --------- All Account ---------
                    </p>
                    <p className="flex items-center gap-1">
                      <FaUserCircle /> {user.displayName}{" "}
                      <Link className=" ms-4 hover:text-green-400 border p-y-2 text-green-300">
                        <small>Switch</small>
                      </Link>{" "}
                    </p>
                  </li>
                  <hr className="border-t-4 border-white mt-2" />
                </div>
                <li>
                  <Link to="dashboard/welcome">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      <RiDashboardFill className="w-6 h-6" />
                      Dashboard
                    </p>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/add-account">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      <FiUserPlus className="w-6 h-6" />
                      Add More Account
                    </p>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/UpdateProfile">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      {" "}
                      <AiOutlineUser className="w-4 h-4" />
                      Update Profile
                    </p>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      {" "}
                      <MdLiveHelp className="w-4 h-4" />
                      Live Support
                    </p>{" "}
                  </Link>
                </li>
                <li>
                  <Link title="We offer a 30-day money-back guarantee" to="/">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      {" "}
                      <MdLocalAtm className="w-4 h-4" />
                      Refund Policy
                    </p>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      <FiSettings className="w-4 h-4 " /> Settings
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/invite">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      <FaShare></FaShare>Invite Friend{" "}
                    </p>
                  </Link>
                </li>

                <li>
                  <Link to="/terms">
                    {" "}
                    <p className="flex items-center gap-1 hover:text-purple-200">
                      {" "}
                      <FaFileAlt className="w-4 h-4" /> terms and conditions
                    </p>
                  </Link>
                </li>
              </ul>
              <button
                onClick={closeModal}
                className="btn bg-red-100 mt-4 w-full hover:bg-red-300"
              >
                <AiOutlineCloseCircle className="w-6 h-6 text-red-400 hover:text-red-800" />
              </button>
            </div>
          </div>
        )}

        <div className="navbar-end ms-10">
          {user ? (
            <Link
              onClick={handleLogout}
              className="btn hover:text-purple-500 text-gray-500 font-extrabold"
            >
              LogOut <HiOutlineLogout className="ml-1 w-5 h-5" />
            </Link>
          ) : (
            <Link
              to="/logIn"
              className="btn hover:text-purple-500 text-gray-500 font-extrabold"
            >
              LogIn <HiOutlineLogin className="ml-1 w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
</div>
  );
};

export default MainNav;
