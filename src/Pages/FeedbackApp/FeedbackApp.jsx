
import React, { useContext, useState } from 'react';
import { FaPaperPlane, FaStar } from 'react-icons/fa'; // Step 1
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { AiOutlineClear } from 'react-icons/ai';

const FeedbackApp = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { user } = useContext(AuthContext);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleClearFeedback = () => {
    setFeedback('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the feedback and rating data to your server or perform any other actions.
    // For this example, we'll just log the data.
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Show toast message for successful submission
    toast.success('Thank You For Your Valuable Feedback!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // Reset the form
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-600 hover:text-purple-700">Give Your Valuable Feedback & Rating</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-3xl cursor-pointer ${
                  index + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => handleRatingClick(index + 1)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Feedback:</label>
          <div className="relative">
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full border border-gray-300 rounded p-2"
              rows="4"
              placeholder="Leave your feedback here..."
            ></textarea>
            {feedback.length > 0 && ( // Show the clear icon only when the textarea has content
              <AiOutlineClear title='Clear Feedback'
                className="text-green-900 bg-green-200 rounded-lg absolute bottom-3 right-3 cursor-pointer"
                onClick={handleClearFeedback}
              />

            )}
          </div>
        </div>
        <button
          type="submit"
          className={`${
            !user ? 'bg-red-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded`}
          disabled={!user}
          title={!user ? 'Please login first' : ''}
        >
          {!user && <span className="mr-2 text-white">⚠️</span>}
          <FaPaperPlane className="inline-block mr-1" /> Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackApp;


