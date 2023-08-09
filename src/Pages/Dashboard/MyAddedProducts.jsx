import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/AuthProvider';

const MyAddedProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    console.log(products.length);

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
    this is my added product {products.length}
</div>
    );
};

export default MyAddedProducts;

