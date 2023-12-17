import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../../Firebase/Firebase.config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const auth = getAuth(app);
    const [displayName, setDisplayName] = useState(user.displayName || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        setEmailVerified(user.emailVerified);
    }, [user]);

    const handleUpdateProfile = () => {
        if (!displayName) {
            setErrorMessage('Please provide either Display Name or Photo');
            return;
        }

        updateProfile(auth.currentUser, {
            displayName: displayName || user?.displayName,
        })
            .then(() => {
                const updatedUser = auth.currentUser;
                setDisplayName(updatedUser.displayName || '');

                toast.success('Profile updated successfully', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                setErrorMessage('Failed to update profile: ' + error.message);
                toast.warning('Failed to update profile', {
                    position: 'top-right',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const handleSendEmailVerification = () => {
        if (!emailVerified) {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success('Verification email sent successfully', {
                        position: 'top-right',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((error) => {
                    toast.error('Failed to send verification email: ' + error.message, {
                        position: 'top-right',
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            toast.info('Email already verified', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
       <div className=' bg-gradient-to-r from-purple-600 to-indigo-800 rounded-lg shadow-2xl min-h-screen'>
        <div className="flex items-center mb-4">
        <Link to="/" className="flex items-center gap-1 text-blue-100 hover:underline p-5">
          <FaArrowLeft /> Continue Home
        </Link>
      </div>
         <div className="max-w-xl mx-auto p-8 text-white">
            <h2 className="text-4xl font-bold mb-8">Update Your Profile</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="mb-8">
                <label htmlFor="displayName" className="block text-lg font-semibold mb-2">
                    Display Name
                </label>
                <input
                    required
                    type="text"
                    id="displayName"
                    className="bg-gray-200 text-gray-800 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder={user.displayName}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            <div className="flex justify-between items-center mb-12">
                <div>
                    <label htmlFor="displayImage" className="block text-lg font-semibold">
                        Profile Picture
                    </label>
                    <img src={user?.photoURL} alt="Profile" className="w-40 h-40 rounded-md" />
                </div>
                <button
                    className={`${
                        emailVerified
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-4 py-2 rounded-full transition duration-300`}
                    onClick={handleSendEmailVerification}
                    disabled={emailVerified}
                >
                    {emailVerified ? 'Already Verified Email' : 'Send Email Verification Code'}
                </button>
            </div>

            <button
                className="bg-indigo-700 text-white px-8 py-4 rounded-full hover:bg-indigo-800 transition duration-300"
                onClick={handleUpdateProfile}
            >
                Update Profile
            </button>
        </div>
       </div>
    );
};

export default UpdateProfile;
