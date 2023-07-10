
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import login from '../../../assets/image/login.webp';
import background from '../../../assets/image/crop.jpg';
import { FaEye,FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    if (!passwordMatch) {
      return; // Prevent form submission if passwords don't match
    }
    console.log(data); // Handle form submission here
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-size 0.3s",
        width: "100%",
        height: "100vh",
      }}
    >
    <div className='px-5'>
    <div>
    <Link to="/" className='text-white  absolute mt-5 font-extrabold bg-green-500 hover:bg-green-600  px-2 py-2 rounded-full focus:outline-none shadow-md transition-shadow duration-300 '>GO TO HOME</Link>
    </div>
    </div>
      <div className="flex justify-center items-center h-full text-white">
        <div style={{backgroundImage: `url(${background})`,  backgroundPosition: "center",backgroundSize: "cover"}} className=" p-11   rounded shadow-md h-80 ">
          <div className="-mt-8">
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <form className="w-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-extrabold">Name</label>
                <input
                  required
                  type="text"
                  id="name"
                  className={`form-input text-black mt-1 block w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("name", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-extrabold">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  className={`form-input text-black mt-1 block w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("email", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white font-extrabold">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`form-input text-black mt-1 block w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("password", { required: true })}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-700 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash></FaEyeSlash>
                     
                    ) : (
                      <FaEye></FaEye>
                    )}
                  </span>
                </div>
              </div>
              <div className="mb-1">
                <label htmlFor="confirmPassword" className="block text-white font-extrabold">Confirm Password</label>
                <input
                  required
                  type="password"
                  id="confirmPassword"
                  className={`form-input mt-1 text-black block w-full ${errors.confirmPassword || !passwordMatch ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("confirmPassword", { required: true })}
                  onChange={(e) => setPasswordMatch(e.target.value === watch('password'))}
                />
                {!passwordMatch && <span className="text-red-500 text-sm">Passwords do not match</span>}
              </div>
              <div className="mb-3 ml-12 mt-4">
                <label htmlFor="terms" className="flex items-center">
                  <input
                  required
                    type="checkbox"
                    id="terms"
                    className="form-checkbox"
                    {...register("terms", { required: true })}
                  />
                  <span className="ml-2  text-white">I agree to the terms and conditions</span>
                </label>
               <p>New User? <span className='text-green-400'> <Link to="/registration">Register Now </Link></span></p>
              </div>
              <div className="mb-4 mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <hr className="w-2/5" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="w-2/5" />
          </div>
          <div className="flex justify-center mt-2">
  <Link
    type="button"
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    <p className="flex items-center gap-1">
      <FaFacebook className="mt-1 text-2xl" /> Sign in with Facebook
    </p>
  </Link>
  <Link
    type="button"
    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
  >
    <p className="flex items-center gap-1">
      <FaGoogle className="mt-1 text-2xl" /> Sign in with Google
    </p>
  </Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default LogIn;
