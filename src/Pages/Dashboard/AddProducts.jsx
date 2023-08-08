
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';


const ProductAddForm = () => {
    const {
        handleSubmit,
        control,
        register,
        reset,
        setValue,
        getValues,
    } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
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
                className="bg-gray-900 p-4 rounded-lg shadow-lg grid grid-cols-2 gap-4"
            >
                <div className="col-span-2">
                <div className="col-span-2 flex justify-end">
                    <button
                        type="button"
                        title='Reset Form'
                        onClick={resetForm}
                        className="text-red-500 hover:text-red-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                </div>
                <div>
                    <input
                        type="text"
                        {...register('productName')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder="Product Name"
                    />
                </div>
                <div>
                    <input
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
                        {...register('category')}
                        className="px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full rounded-sm"
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
                        {...register('discountPercentage')}
                        className="bg-gray-700 text-white p-2 w-full rounded"
                        placeholder=" Product Discount %"
                    />
                </div>
                <div>
                    <input
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
