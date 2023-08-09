import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/AuthProvider';


const MyAddedProducts = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [products,setProducts]=useState([])
    console.log(products);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/instructor/myAddedProducts/${encodeURIComponent(user.email)}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUserData();
  }, [user.email]);

    return (
        <div>
           <div className="bg-gray-900">
           <h1 className="font-extrabold bg-white">this is My Added Products {products.length} </h1>
           </div>
        </div>
    );
};

export default MyAddedProducts;

