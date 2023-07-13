import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-orange-700 text-white font-bold px-5 rounded">
        <div className="flex-1">
          A leading Smartphone Shop in Bangladesh 
        </div>
        <div className="flex-none flex items-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <ul className="p-2 flex items-center">
                <li className="mr-2">
                  <Link>
                    <FaFacebook />
                  </Link>
                </li>
                <li className="mr-2">
                  <Link>
                    <FaLinkedin />
                  </Link>
                </li>
                <li>
                  <Link>
                    <FaTwitter />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="hidden md:flex">
            <p className="mr-4"><Link>TRACK ORDER |</Link></p>
            <p className="mr-4 hover:text-purple-300"><Link to="/contactUs">CONTACT US |</Link></p>
            <p><Link className="hover:text-purple-300" to="/AskedQuestions">FAQS</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
