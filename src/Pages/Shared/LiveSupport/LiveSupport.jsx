import React, { useState, useEffect } from 'react';

const LiveSupport = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a delay to show the spinner
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Change this delay as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? (
                // Show spinner while loading
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
                </div>
            ) : (
                // Show content when loading is complete
                <p className="flex mx-auto justify-center p-5">Live Support Feature Coming Soon.!</p>
            )}
        </div>
    );
};

export default LiveSupport;
