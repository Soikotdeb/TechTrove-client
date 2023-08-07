
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import login from '../../../assets/image/login.webp';
import background from '../../../assets/image/crop.jpg';
import { FaEye,FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import {  sendEmailVerification } from 'firebase/auth';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch,reset } = useForm();
  const {createUser,googleSIgnIn}=useContext(AuthContext)
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!passwordMatch) {
      return; // Prevent form submission if passwords don't match
    }
    data.role='user'
  
    console.log("user data",data); // Handle form submission here
  
    createUser(data.email, data.password,data.role)
      .then(result => {
        const user = result.user;
        console.log(user);

        if (!user.emailVerified) {
          sendEmailVerification(user)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have successfully registered. Please check your email for verification.',
              });
              reset()
            })
            .catch(error => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Email Verification Failed',
                text: 'There was an error sending the email verification.',
              });
            });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Email Already Verified',
            text: 'Your email is already verified. No further action is required.',
          });
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'There was an error during registration.',
        });
      });
  };

  
  
  const handleGoogleSignIn = () => {
    if (!acceptedTerms) {
      // Show error alert if terms and conditions are not accepted
      Swal.fire({
        icon: 'error',
        title: 'Terms and Conditions',
        text: 'Please accept the terms and conditions before signing in with Google.',
      });
      return;
    }
  
    googleSIgnIn()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
  
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'LogIn Successful',
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Assuming navigate is a function for navigation, move it inside the chain
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Handle any errors that occur during Google Sign-In
        console.error('Error during Google Sign-In:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'LogIn Failed',
          text: 'An error occurred during Google Sign-In',
          showConfirmButton: false,
          timer: 1500,
        });
      });
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
            <h2 className="text-2xl font-bold mb-2 text-orange-600">Register Now </h2>
            <form className="w-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-extrabold">Name</label>
                <input
                  required
                  type="text"
                  name='name'
                  id="name"
                  className={`form-input font-semibold bg-gray-500 text-current mt-1 block w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("name", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-extrabold">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  name='email'
                  className={`form-input font-semibold bg-gray-500 text-current mt-1 block w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                    name='password'
                    className={`form-input font-semibold bg-gray-500 text-current mt-1 block w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                  name='confirmPassword'
                  className={`form-input font-semibold mt-1 bg-gray-500 text-current block w-full ${errors.confirmPassword || !passwordMatch ? 'border-red-500' : 'border-gray-300'}`}
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
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                  />
                  <span className="ml-2  text-white">I agree to the terms and conditions</span>
                </label>
               <p>Already Have Account? <span className='text-green-400'> <Link to="/logIn">SignIn Now</Link></span></p>
              </div>
              <div className="mb-4 mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Register Now 
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
  onClick={handleGoogleSignIn}
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

export default Registration;
