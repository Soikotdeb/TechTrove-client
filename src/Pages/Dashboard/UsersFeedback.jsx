
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegStar, FaStar, FaUndoAlt } from "react-icons/fa";
import Rating from 'react-rating';

import 'tailwindcss/tailwind.css';

const UsersFeedback = () => {
    const { data: Feedback = [], refetch } = useQuery(
        ["Feedback"],
        async () => {
            const res = await fetch("https://tech-trove-gadget-bazar-database.vercel.app/UsersFeedback");
            return res.json();
        }
    );

    const handleRefetch = () => {
        refetch();
    };

    const [expandedFeedback, setExpandedFeedback] = useState([]);
    const [displayedFeedbackCount, setDisplayedFeedbackCount] = useState(9);

    const toggleExpand = (feedbackId) => {
        if (expandedFeedback.includes(feedbackId)) {
            setExpandedFeedback(expandedFeedback.filter(id => id !== feedbackId));
        } else {
            setExpandedFeedback([...expandedFeedback, feedbackId]);
        }
    };

    const handleShowMore = () => {
        setDisplayedFeedbackCount(Feedback.length);
    };

    return (

<div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-8 min-h-screen w-full">
            <div className="border-b border-l border-r border-t border-green-300 mb-2 text-gray-300">
                <marquee behavior="" direction="left" className="text-2xl font-bold">
                    User Feedback: This is some relevant feedback from our users...
                </marquee>
            </div>
            <button
                onClick={handleRefetch}
                className="text-blue-400 px-4 py-2 rounded-lg mb-4 hover:text-blue-600 absolute top-8 right-6"
            >
                <FaUndoAlt size={16} />
            </button>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Feedback.slice(0, displayedFeedbackCount).map((feedback) => (
                    <div key={feedback._id} className="bg-gradient-to-br from-gray-700 to-gray-800 border border-b border-l border-r border-t border-gray-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="flex items-center mb-4">
                            <img src={feedback.UserProfile} alt={feedback.UserName} className="w-12 h-12 rounded-full mr-3" />
                            <p className="text-white text-lg font-semibold">⍟ {feedback.UserName}</p>
                        </div>
                        <div className="mb-2 flex gap-5">
                        <p className="text-purple-500">➲</p>  <Rating
                                readonly
                                placeholderRating={feedback.rating}
                                emptySymbol={<FaRegStar className="text-gray-600"></FaRegStar>}
                                placeholderSymbol={<FaStar className="text-red-500"></FaStar>}
                                fullSymbol={<FaStar className="text-red-500"></FaStar>}
                                className="ms-2"
                            ></Rating>
                        </div>
                            <hr className="mb-2 border-t-2 border-gray-700" />
                        <p className="text-gray-300 text-sm">
                       <span className="text-purple-500"> ⟿</span>{' '}     {expandedFeedback.includes(feedback._id)
                                ? feedback.feedback
                                : feedback.feedback.slice(0, 20)}
                            {!expandedFeedback.includes(feedback._id) && feedback.feedback.length > 20 && (
                                <>
                                    <span> ... </span>
                                    <button
                                        onClick={() => toggleExpand(feedback._id)}
                                        className="text-blue-400 hover:underline hover:text-blue-600 "
                                    >
                                        Read More
                                    </button>
                                </>
                            )}
                            {expandedFeedback.includes(feedback._id) && (
                                <button
                                    onClick={() => toggleExpand(feedback._id)}
                                    className="text-blue-400 hover:underline hover:text-blue-600 ml-1"
                                >
                                    Read Less
                                </button>
                            )}
                        </p>
                    </div>
                ))}
            </div>
           <div className="flex justify-center">
           {displayedFeedbackCount < Feedback.length && (
                 <button
                 onClick={handleShowMore}
                 className="border border-gray-600 w-1/2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-lg mt-4 hover:opacity-90 transition duration-300 "
             >
                <span className="text-gray-300 hover:text-gray-200 text-lg"> Show More</span>
             </button>
            )}
           </div>
        </div>

    );
};

export default UsersFeedback;


