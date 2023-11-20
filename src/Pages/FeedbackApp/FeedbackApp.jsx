
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
    const UserProfile = user?.photoURL
    const UserName = user?.displayName


    fetch('https://tech-trove-gadget-bazar-database.vercel.app/UserFeedback', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        feedback: feedback,
        UserProfile: UserProfile,
        UserName: UserName
      }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.insertedId) {
          // Show toast message for successful submission
          toast.success('Thank You For Your Valuable Feedback!')
        }
      })
      .catch((error) => {
        toast.error('Error sending user data to the server:', error)
      });
    // Reset the form
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-400 hover:text-purple-700">Give Your Valuable Feedback & Rating</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-3xl cursor-pointer ${
                  index + 1 <= rating ? 'text-red-500' : 'text-gray-400'
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
