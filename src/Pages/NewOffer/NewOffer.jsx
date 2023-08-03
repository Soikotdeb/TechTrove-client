import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const NewOffer = () => {
    const [offers, setOffers] = useState([]);
  
    useEffect(() => {
      // Simulate fetching data from the backend or an API
      // Replace this with your actual data-fetching logic
      const fetchedOffers = [
        { title: "Offer 1", discount: "10% off" },
        { title: "Offer 2", discount: "20% off" },
        { title: "Offer 3", discount: "30% off" },
        { title: "Offer 4", discount: "40% off" },
        { title: "Offer 5", discount: "50% off" },
        // Add more offers as needed
      ];
      setOffers(fetchedOffers);
    }, []);
  
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4 justify-center align-middle text-center text-purple-600 hover:text-purple-700">All Latest Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.discount}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  export default NewOffer;
  