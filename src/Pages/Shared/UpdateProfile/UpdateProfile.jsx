
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { getAuth, updateProfile} from 'firebase/auth';
import app from '../../../Firebase/Firebase.config';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const auth = getAuth(app);
    const [displayName, setDisplayName] = useState(user.displayName || '');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdateProfile = () => {
        if (!displayName) {
            setErrorMessage('Please provide either Display Name or Photo');
            return;
        }

        updateProfile(auth.currentUser, {
            displayName: displayName || user?.displayName,
            
        })
        .then(() => {
            // Profile updated successfully
            // Fetch updated user data after update
            const updatedUser = auth.currentUser;
            setDisplayName(updatedUser.displayName || '');
            // You may fetch other updated profile data similarly if needed

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
            // Handle error
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


    return (
       <div className='p-5'>
         <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="mb-4">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                    Display Name
                </label>
                    <input
                    required
                        type="text"
                        id="displayName"
                        className="bg-gray-400 text-white p-2 w-full rounded"
                        placeholder={user.displayName}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
            <div className="flex justify-between items-center">
                <div>
                    <label htmlFor="displayImage" className="block text-sm font-medium text-gray-700">
                       <img src={user?.photoURL} alt="" />
                    </label>
                </div>
            </div>

            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 mt-4"
                onClick={handleUpdateProfile}
            >
                Update Profile
            </button>
        </div>
       </div>
    );
};

export default UpdateProfile;
