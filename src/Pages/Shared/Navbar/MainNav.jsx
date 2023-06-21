import { BiSearch } from 'react-icons/bi';
import { FaExchangeAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';

const MainNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className='font-semibold'>
      <div className="navbar bg-gray-100 ">
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
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
          <a className="btn btn-ghost normal-case text-4xl">TechTrove</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div>
            <input
              type="text"
              placeholder="Type here"
              className="max-w-md border px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="max-w-xs px-4 py-3 ml-1 bg-white rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option disabled selected>
                Category?
              </option>
              <option>Laptops</option>
              <option>Lost</option>
              <option>Smartphones</option>
              <option>Cameras</option>
            </select>
            <button className="btn btn-primary  ml-1 px-4 py-3">
              <BiSearch className="w-6 h-6" />
            </button>
          </div>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link>
                <FaHeart className="w-6 h-6" />
              </Link>
            </li>
            <li tabIndex={0}></li>
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
        <div className="navbar-end">
          {loggedIn ? (
            <Link onClick={handleLogin} className="btn">
              LogIn <HiOutlineLogin className="ml-1 w-5 h-5" />
            </Link>
          ) : (
            <Link onClick={handleLogout} className="btn">
              LogOut <HiOutlineLogout className="ml-1 w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
