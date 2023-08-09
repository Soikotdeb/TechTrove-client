
import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaUndoAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';



const ProductAddForm = () => {
    
    const { user } = useContext(AuthContext); // Make sure you have your user data in context
  
    const {
      handleSubmit,
      control,
      register,
      reset,
      setValue,
      getValues,
    } = useForm();
  
    const onSubmit = (data, e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      const form = e.target;
  
      const instructorInfo = {
        instructorEmail: user.email,
        instructorName: user.displayName,
      };
  
      // Combine form data with instructorInfo
      const postData = { ...data, ...instructorInfo };
  
      // Perform POST request to the server AddProducts to Instructor
      fetch('http://localhost:5000/AddProducts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((response) => {
          // Handle successful response here
          console.log('Response:', response);
  
          // Check if the 'acknowledged' property is true in the response
          if (response.acknowledged === true) {
            // Show success notification
            toast.success('Product added successfully!');
            // Reset the form fields using e.target.reset()
            form.reset();
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error:', error);
          // Show toast error notification
          toast.error('An error occurred while adding the product.');
        });
    };
      

    
    const [showAdditionalImages, setShowAdditionalImages] = useState(false);

    const toggleAdditionalImages = () => {
        setShowAdditionalImages(!showAdditionalImages);
    };

    const initialImageCount = showAdditionalImages ? 4 : 2;

    const productImages = Array.from({ length: initialImageCount }).map((_, index) => (
        <div key={index} className="mb-4">
            <input
                type="file"
                {...register(`productImages[${index}]`)}
                className="bg-gray-700 text-white p-2 w-full rounded"
            />
        </div>
    ));

    const resetForm = () => {
        reset();
    };

    return (
        <div className="bg-gray-800 w-full min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-900 p-4 rounded-lg shadow-lg grid grid-cols-2 gap-4 lg:w-[900px]"
            >
                <div className="col-span-2">
                <div className="col-span-2 flex gap-2 justify-end">
                <p className='text-green-500'>reset Form</p>
                    <button
                        type="button"
                        title='Click To Reset Form'
                        onClick={resetForm}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FaUndoAlt size={20} />
                    </button>
                </div>
                </div>
                <div>
                    <input
                    required
                        type="text"
                        {...register('productName')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Product Name"
                    />
                </div>
                <div>
                    <input
                    required
                        type="number"
                        {...register('price')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        {...register('productColor')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Product Color"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        {...register('storage')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Storage"
                    />
                </div>
                
                <div className="col-span-2">
                    <textarea
                        {...register('description')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Description"
                        rows={4}
                    />
                </div>
              
              

                <div className="col-span-2">
                    <label htmlFor="category" className="text-white">
                        Select Category:
                    </label>
                    <select
                    required
                        {...register('category')}
                        className="px-4 py-3 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full rounded-sm"
                    >
                         <option disabled selected>
                         Select Your Products Category?
                         </option>
                        <option>Latest Offers</option>
                        <option>Nokia</option>
                        <option>Huawei</option>
                        <option>iPhone</option>
                        <option>MacBook</option>
                        <option>Google</option>
                        <option>Xiaomi</option>
                        <option>Vivo</option>
                        <option>Samsung</option>
                        <option>OnePlus</option>
                        <option>Oppo</option>
                        <option>accessories</option>
                        
                    </select>
                </div>
                <div>
                    <input
                    required
                        type="text"
                        {...register('madeIn')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Made In"
                    />
                </div>
                <div>
                    <label htmlFor="productImages" className="text-white">
                        Product Images:
                    </label>
                    {productImages}
                    <button
                        type="button"
                        onClick={toggleAdditionalImages}
                        className="text-white hover:underline ml-2"
                    >
                        {showAdditionalImages ? 'Hide' : 'Show More..'}
                    </button>
                </div>


                <div>
                    <input
                        type="number"
                        {...register('discountAmount')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder=" Product Discount Amount"
                    />
                </div>
                <div>
                    <input
                    required
                        type="number"
                        {...register('productQuantity')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Available Product Quantity"
                    />
                </div>
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAddForm;

