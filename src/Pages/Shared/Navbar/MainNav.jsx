import { BiSearch } from 'react-icons/bi';
import { FaExchangeAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { HiOutlineLogout } from 'react-icons/hi';
import { useContext} from 'react';
import logo from '../../../assets/image/company logo.png'
import { AuthContext } from '../../../Provider/AuthProvider';

const MainNav = () => {
  const { user, logOut } = useContext(AuthContext);


  const handleLogout = () => {
    logOut()
    .then(()=>{
    })
    .catch((error) => {
      console.log(error);
    });
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
          <img className='w-9 h-12 rounded' src={logo} alt="" />
          <a className="btn btn-ghost normal-case text-4xl hover:text-purple-600">TechTrove</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className='border py-1 px-1 border-gray-200 bg-white rounded'>
            <input
              type="text"
              placeholder="Type here"
              className="max-w-md border px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="max-w-xs px-4 py-3 ml-1 bg-white rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
            <button className="btn   ml-1 px-4 py-3">
              <BiSearch className="w-6 h-6" />
            </button>
          </div>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link>
                <FaHeart className="w-6 h-6 hover:text-purple-700" />
              </Link>
            </li>
            <li tabIndex={0}></li>
            <li>
              <a>
                <FaShoppingCart className="w-6 h-6 hover:text-purple-700" />
              </a>
            </li>
            <li>
              <a>
                <FaExchangeAlt className="w-6 h-6 hover:text-purple-700" />
              </a>
            </li>
          </ul>
        </div>

         {
          user &&
          <div title={user.displayName || 'Not Available User Name' } className="avatar online">
          <div className="w-9 rounded-full">
         <img src="data:image/jpeg;base64,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" />
         </div>
         </div>
         }
         

         
        

        <div className="navbar-end">
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
