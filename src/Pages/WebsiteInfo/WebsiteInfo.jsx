
import React, { useState, useEffect } from 'react';
import logo from '../../assets/image/company logo.png';
import { FaWallet } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';

const WebsiteInfo = () => {
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [users, setTotalUser] = useState(0);
    useEffect(() => {
        // Function to fetch feedback count
        const fetchFeedbackCount = async () => {
            try {
                const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/UsersFeedback");
                const data = await res.json();
                setFeedbackCount(data.length);
            } catch (error) {
                console.error("Error fetching feedback count:", error);
            }
        };
        // Initial fetch of feedback count
        fetchFeedbackCount();

        // Setup interval to periodically fetch feedback count
        const interval = setInterval(fetchFeedbackCount, 1000); // Adjust the interval as needed

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        // Function to fetch TotalUser count
        const fetchUserCount = async () => {
            try {
                const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/users");
                const data = await res.json();
                setTotalUser(data.length);
            } catch (error) {
                console.error("Error fetching feedback count:", error);
            }
        };
        // Initial fetch of feedback count
        fetchUserCount();

        // Setup interval to periodically fetch feedback count
        const interval = setInterval(fetchUserCount, 1000); // Adjust the interval as needed

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
          <div className='text-3xl font-bold mb-4 text-center text-gray-400 hover:text-purple-700'>
         <p>Our success</p>
         </div>
            <div className='flex justify-center gap-4'>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Users Total Feedback & Rating</div>
                    <div className="stat-value text-primary">{feedbackCount}</div>
                    <div className="stat-desc">user Feedback Daily Grow Up continuously</div>
                </div>

                <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src={logo} />
        </div>
      </div>
    </div>
    <div className="stat-value">86%</div>
    <div className="stat-title">Tasks done</div>
    <div className="stat-desc text-secondary">31 tasks remaining</div>
  </div>
            </div>
            <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    <BsPeopleFill size={24} />
    </div>
    <div className="stat-title">Total Users</div>
    <div className="stat-value">{users}</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
     <FaWallet size={24}/>
    </div>
    <div className="stat-title">Total Sold Product</div>
    <div className="stat-value">0000</div>

  </div>
  
</div>
        </div>
        </div>
   
    );
};

export default WebsiteInfo;