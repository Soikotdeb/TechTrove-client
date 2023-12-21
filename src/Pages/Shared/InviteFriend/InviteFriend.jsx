import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const InviteFriend = () => {
    const handleSocialMedia = (platform) => {
        let message = 'Check out this link: https://techtrove-abe8f.web.app/';

        const socialMediaURLs = {
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/intent/tweet?url=',
            linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
            instagram: 'https://www.instagram.com/',
            whatsapp: 'https://api.whatsapp.com/send?text=',
            gmail: 'https://mail.google.com/',
            // Add more platforms as needed
        };

        const finalURL = socialMediaURLs[platform];

        if (isLoggedIn()) {
            window.open(finalURL + encodeURIComponent(message));
        } else {
            redirectToLoginPage();
        }
    };

    const isLoggedIn = () => {
        return true; // Replace with actual login status check
    };

    const redirectToLoginPage = () => {
        console.log('Redirecting to login page...');
        // Replace with actual redirection mechanism
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-center">Invite Friends TO Visit Our Website</h1>
                <div className="flex items-center justify-center space-x-8">
                    <button onClick={() => handleSocialMedia('facebook')} className="rounded-full bg-blue-600 text-white p-3 hover:bg-blue-700 transform transition duration-300 hover:scale-110">
                        <FiFacebook className="h-8 w-8" />
                    </button>
                    <button onClick={() => handleSocialMedia('twitter')} className="rounded-full bg-blue-400 text-white p-3 hover:bg-blue-500 transform transition duration-300 hover:scale-110">
                        <FiTwitter className="h-8 w-8" />
                    </button>
                    <button onClick={() => handleSocialMedia('linkedin')} className="rounded-full bg-blue-800 text-white p-3 hover:bg-blue-900 transform transition duration-300 hover:scale-110">
                        <FiLinkedin className="h-8 w-8" />
                    </button>
                    <button onClick={() => handleSocialMedia('instagram')} className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 hover:from-pink-600 hover:to-red-600 transform transition duration-300 hover:scale-110">
                        <FiInstagram className="h-8 w-8" />
                    </button>
                    <button onClick={() => handleSocialMedia('whatsapp')} className="rounded-full bg-green-500 text-white p-3 hover:bg-green-600 transform transition duration-300 hover:scale-110">
                        <FaWhatsapp className="h-8 w-8" />
                    </button>
                    <button onClick={() => handleSocialMedia('gmail')} className="rounded-full bg-red-500 text-white p-3 hover:bg-red-600 transform transition duration-300 hover:scale-110">
                        <FiMail className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteFriend;
