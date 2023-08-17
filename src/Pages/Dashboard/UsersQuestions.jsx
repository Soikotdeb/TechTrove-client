import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaPaperPlane, FaReplyAll, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FiX } from 'react-icons/fi';

const UsersQuestions = () => {
    const { data: Questions = [], refetch } = useQuery(
        ["Questions"],
        async () => {
            const res = await fetch("http://localhost:5000/UsersQuestions");
            return res.json();
        }
    );

    const [replyModalOpen, setReplyModalOpen] = useState(false);

    const [replyText, setReplyText] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");

    const openReplyModal = (email) => {
        setSelectedEmail(email);
        setReplyModalOpen(true);
    };

    const closeReplyModal = () => {
        setReplyText("");
        setSelectedEmail("");
        setReplyModalOpen(false);
    };
    const sendReply = () => {
        if (replyText && selectedEmail) {
            // Send email using EmailJS
            const userId = "A1Zs33WiuGDuR3oV-"; // Replace with your actual EmailJS user ID
            emailjs.send("service_a3536w5", "template_zb3idmb", {
                to_email: selectedEmail,
                message: replyText,
            }, userId)
            .then(() => {
                closeReplyModal();
                Swal.fire('Success', 'Email sent successfully!', 'success');
            }).catch((error) => {
                console.error("Error sending email:", error);
            });
        }
    };
    
    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure you want to delete?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/UsersQuestions/${id}`, {
                    method: 'DELETE'
                });
                await Swal.fire({
                    icon: 'success',
                    title: 'Question Deleted',
                    text: 'User Question has been deleted successfully.',
                    confirmButtonText: 'OK'
                });
                // Refetch Question after delete
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-1/2 h-auto px-3">
            <ul>
                {Questions.map((Question, index) => (
                    <div
                        key={index}
                        className="border p-4 my-4 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300"
                    >
                        <img src={Question?.UserProfile} alt="" />
                        <p className="text-lg font-semibold">
                            Question: {Question.question}
                        </p>
                        <p>Name: {Question.name}</p>
                        <p>Email: {Question.email}</p>
                        <p>Age: {Question.age}</p>
                        <p>Date: {Question.date}</p>
                        <p>Time: {Question.time}</p>
                        <p>Country: {Question.country}</p>
                        <div className="mt-4 flex gap-5">
                            <button
                                onClick={() => openReplyModal(Question.email)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                <FaReplyAll />
                            </button>
                            <Link
                            onClick={() => handleDelete(Question._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                <FaTrashAlt />
                            </Link>
                        </div>
                    </div>
                ))}
            </ul>

            {replyModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                            Reply to {selectedEmail}:
                        </h2>
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Write your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                            <button
                                onClick={closeReplyModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                            >
                             <FiX size={12} color="red"  title="Cancel"/>
                            </button>
                            <button
                                onClick={sendReply}
                                className="ml-2 bg-blue-300 hover:bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              <FaPaperPlane size={12} color="green" title="Send"/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersQuestions;
