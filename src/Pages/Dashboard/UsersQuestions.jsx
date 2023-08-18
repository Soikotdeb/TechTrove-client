
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaReplyAll, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const UsersQuestions = () => {
    const { data: Questions = [], refetch } = useQuery(
        ["Questions"],
        async () => {
            const res = await fetch("http://localhost:5000/UsersQuestions");
            return res.json();
        }
    );
    
    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure you want to delete?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            });

            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/UsersQuestions/${id}`, {
                    method: "DELETE",
                });
                await Swal.fire({
                    icon: "success",
                    title: "Question Deleted",
                    text: "User Question has been deleted successfully.",
                    confirmButtonText: "OK",
                });
                // Refetch Question after delete
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substr(0, maxLength) + "...";
        }
        return text;
    };

    const [expandedQuestion, setExpandedQuestion] = useState(null);

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-3 px-2">
            {Questions.map((Question, index) => (
                <motion.div
                    key={index}
                    className="bg-gradient-to-b from-blue-800 to-blue-900 rounded-lg p-8 text-white shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition duration-300"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex justify-center mb-4">
                        <img
                            src={Question?.UserProfile}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full"
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">{Question.name}</h3>
                        <p className="text-sm text-gray-300">{Question.email}</p> 
                        <p className="text-sm text-gray-300">Age: {Question.age}</p>
                    </div>
                    <div className="mb-2 border-b border-gray-700 pb-2">
                        <p className="text-xs text-gray-400">Date: {Question.date}</p>
                        <p className="text-xs text-gray-400">Time: {Question.time}</p>
                        <p className="text-xs text-gray-400">Country: {Question.country}</p>
                    </div>
                    <small className="flex justify-center text-red-300 hover:text-red-400 border border-green-400 hover:border-green-500"> <marquee > Users Question</marquee></small>
                    <p className="text-sm text-gray-300 mb-4 mt-2">
                        {expandedQuestion === index
                            ? Question.question
                            : truncateText(Question.question, 50)}{" "}
                        {Question.question.length > 50 && (
                            <button
                                className="text-green-300 hover:underline"
                                onClick={() =>
                                    setExpandedQuestion(
                                        expandedQuestion === index ? null : index
                                    )
                                }
                            >
                                {expandedQuestion === index ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </p>
                    <div className="flex justify-between">
                        <button
                            title="Click To Reply"
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            <FaReplyAll />
                        </button>
                        <Link
                            title="Click To Delete"
                            onClick={() => handleDelete(Question._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            <FaTrashAlt />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default UsersQuestions;
