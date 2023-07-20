
import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import login from '../../../assets/image/login.webp';
import background from '../../../assets/image/crop.jpg';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch,] = useState(true);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { SignIn, resetPassword,googleSIgnIn } = useContext(AuthContext);
  const emailRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);


// email password LogIn added------------

  const onSubmit = (data) => {
    if (!passwordMatch) {
      return; // Prevent form submission if passwords don't match
    }

    console.log(data); // Handle form submission here

    if (isCaptchaVerified) {
      SignIn(data.email, data.password)
        .then((result) => {
          const user = result.user;
          console.log(user);

          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Sign In Successful',
            text: 'You have been signed in successfully.',
          });
          reset()
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error);

          // Show error alert
          Swal.fire({
            icon: 'error',
            title: 'Sign In Failed',
            text: 'An error occurred during sign-in.',
          });
        });
    } else {
      // Show error alert if reCAPTCHA is not verified
      Swal.fire({
        icon: 'error',
        title: 'reCAPTCHA Verification',
        text: 'Please verify that you are not a robot.',
      });
    }
  };


// google LogIn added------------

  function handleGoogleSignIn() {
    googleSIgnIn()
      .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'LogIn Successful',
          showConfirmButton: false,
          timer: 1500
        });

        // Navigate to a new route after successful Google Sign-In
        navigate('/', { replace: true });
      })
      .catch(error => {
        // Handle any errors that occur during Google Sign-In
        console.error('Error during Google Sign-In:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'LogIn Failed',
          text: 'An error occurred during Google Sign-In',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }



  const handleForgotPassword = (data) => {
    resetPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Email Send',
          text: 'Please check your email to reset your password.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Password Reset Failed',
          text: error.message,
        });
        console.log(error.message);
      });
  };

  function onChange(value) {
    console.log('Captcha value:', value);
    setIsCaptchaVerified(true);
  }

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // Perform sign-in action
    handleSubmit(onSubmit)();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-size 0.3s',
        width: '100%',
        height: '100vh',
      }}
    >
      <div className='px-5'>
        <div>
          <Link
            to='/'
            className='text-white  absolute mt-5 font-extrabold bg-green-500 hover:bg-green-600  px-2 py-2 rounded-full focus:outline-none shadow-md transition-shadow duration-300 '
          >
            GO TO HOME
          </Link>
        </div>
      </div>
      <div className='flex justify-center items-center h-full text-white'>
        <div
          style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          className=' p-11   rounded shadow-md h-80 '
        >
          <div className='-mt-8'>
            <h2 className='text-2xl font-bold mb-2 text-orange-600'>Sign In</h2>
            <form className='w-auto' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-white font-extrabold'>
                  Name
                </label>
                <input
                  required
                  type='text'
                  id='name'
                  name='name'
                  className={`form-input bg-gray-500 font-semibold text-current mt-1 block w-full ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('name', { required: true })}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-white font-extrabold'>
                  Email
                </label>
                <input
                  required
                  type='email'
                  id='email'
                  name='email'
                  ref={emailRef}
                  className={`form-input  font-semibold bg-gray-500 text-current mt-1 block w-full ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('email', { required: true })}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block text-white font-extrabold'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    className={`form-input font-semibold bg-gray-500 text-current mt-1 block w-full ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('password', )}
                  />
                  <span
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-purple-700 cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className='mb-3 ml-12 mt-4'>
                <label htmlFor='terms' className='flex items-center'>
                  <input
                    required
                    type='checkbox'
                    id='terms'
                    className='form-checkbox'
                    {...register('terms', { required: true })}
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                  />
                  <span className='ml-2  text-white'>I agree to the <Link to="/terms" className='text-orange-400'> terms and conditions</Link></span>
                </label>
                <div className='flex gap-12 mt-4'>
                  <p>
                    New User?{' '}
                    <span className='text-green-400'>
                      {' '}
                      <Link to='/registration'>Register Now </Link>
                    </span>
                  </p>
                  <p className='text-purple-600'>
                    <Link title='Must Agree to Terms and Conditions' onClick={handleSubmit(handleForgotPassword)} className='flex  items-center gap-1'>
                      {' '}
                      <span>
                        <FaKey size={10} />{' '}
                      </span>{' '}
                      Reset Password
                    </Link>
                  </p>
                </div>
              </div>
              <div className='mb-4 mt-14'>
                <button
                  className='bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
                  onClick={() => {
                    if (acceptedTerms) {
                      setIsModalOpen(true);
                    } else {
                      // Show error alert if terms and conditions are not accepted
                      Swal.fire({
                        icon: 'error',
                        title: 'Terms and Conditions',
                        text: 'Please accept the terms and conditions.',
                      });
                    }
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className='flex justify-center items-center'>
            <hr className='w-2/5' />
            <span className='mx-2 text-gray-500'>OR</span>
            <hr className='w-2/5' />
          </div>
          <div className='flex justify-center mt-2'>
            <Link
              type='button'
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              <p className='flex items-center gap-1'>
                <FaFacebook className='mt-1 text-2xl' /> Sign in with Facebook
              </p>
            </Link>
            <Link
            onClick={handleGoogleSignIn}
              type='button'
              className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4'
            >
              <p className='flex items-center gap-1'>
                <FaGoogle className='mt-1 text-2xl' /> Sign in with Google
              </p>
            </Link>
            
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed z-50 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <div className='relative w-auto my-6 mx-auto max-w-3xl'>
            <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
              <div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200'>
                <h3 className='text-3xl font-semibold'>Confirm Sign In</h3>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              <div className='relative flex-auto p-6'>
                <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                  Are you sure you want to sign in?
                </p>
                <ReCAPTCHA sitekey='6LdQchknAAAAAC2vNOEi8kaupgEppHNzGpYPJ3ye' onChange={onChange} />
              </div>
              <div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200'>
                <button
                  className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                  type='button'
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;

