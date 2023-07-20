
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AskedQuestions = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-r from-teal-400 to-indigo-600">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
        <form className="grid grid-cols-2 gap-4 bg-white shadow-md rounded px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? 'border-red-500' : ''
              }`}
              type="text"
              id="name"
              placeholder='Enter Your Name'
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              type="email"
              id="email"
              placeholder='Enter Your Email'
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.age ? 'border-red-500' : ''
              }`}
              type="number"
              id="age"
              placeholder='Enter Your Age'
              {...register('age', { required: true, min: 18 })}
            />
            {errors.age && (
              <p className="text-red-500 text-xs italic">Please enter a valid age (minimum 18)</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.date ? 'border-red-500' : ''
              }`}
              type="date"
              id="date"
              {...register('date', { required: true })}
            />
            {errors.date && (
              <p className="text-red-500 text-xs italic">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.time ? 'border-red-500' : ''
              }`}
              type="time"
              id="time"
              {...register('time', { required: true })}
            />
            {errors.time && (
              <p className="text-red-500 text-xs italic">This field is required</p>
            )}
          </div>


          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country
            </label>
            <select
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.country ? 'border-red-500' : ''
              }`}
              id="country"
              {...register('country', { required: true })}
            >
              <option value="">Select a country</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs italic">Please select a country</p>
            )}
          </div>


          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
              Your Question
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.question ? 'border-red-500' : ''
              }`}
              id="question"
              rows="4"
              placeholder='Please Enter Your Valid question'
              {...register('question', { required: true })}
            />
            {errors.question && (
              <p className="text-red-500 text-xs italic">This field is required</p>
            )}
          </div>

          <div className="col-span-2 flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
             <FaPaperPlane className="inline-block mr-1" /> Submit
            </button>
          </div>
          <Link
               to="/"
               className="mt-4 bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition duration-300"
             >
               <FaArrowLeft className="inline-block mr-1" />GO BACK
             </Link>
        </form>
      </div>
    </div>
  );
};

export default AskedQuestions;
