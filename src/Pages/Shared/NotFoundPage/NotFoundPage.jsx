
import { Link } from 'react-router-dom';
import errorImage from '../../../assets/image/funny-404-error-page-design.gif';
import bitly from '../../../assets/image/notFound.gif';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 bg-cover" style={{ backgroundImage: `url(${bitly})` }}>
      <div className="text-center">
        <img
          src={errorImage}
          alt="Error"
          className="w-80 h-auto mx-auto rounded-full border-4 border-gray-300 hover:shadow-lg transition-shadow duration-300"
        />
        <h1 className="text-3xl font-bold mt-8">Oops! Page Not Found</h1>
        <p className="text-lg mb-4 mt-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
