
// import { motion } from 'framer-motion';
// import { FiSettings, FiUser, FiMonitor } from 'react-icons/fi';
// import video from '../../assets/image/background.mp4'

// const WelcomePage = () => {
//   return (
//     <div className="relative w-full flex justify-center items-center h-screen overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         muted
//         loop
//         className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
//       >
//         <source src={video} type="video/mp4" />
//       </video>

//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-lg text-indigo-600 text-center relative z-10"
//       >
//         {/* Add a relevant image */}
//         <img
//           src="/path/to/your/image.jpg"
//           alt="Welcome"
//           className="mx-auto mb-4 rounded-full w-20 h-20"
//         />
//         <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
//         <p className="text-lg mb-4">You have successfully logged in!</p>
//         <p className="text-sm">Explore the awesome features of our dashboard.</p>
//         <div className="mt-8 flex justify-center space-x-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg focus:outline-none"
//           >
//             <FiMonitor className="mr-2 inline-block" />
//             Dashboard
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 360 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none"
//           >
//             <FiUser className="mr-2 inline-block" />
//             Profile
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9, rotate: -45 }}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg focus:outline-none"
//           >
//             <FiSettings className="mr-2 inline-block" />
//             Settings
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WelcomePage;

import React from 'react';

const WelcomePage = () => {
    return (
        <div>
            this is welcome page
        </div>
    );
};

export default WelcomePage;