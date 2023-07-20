import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation();

    const {user, loading}=useContext(AuthContext)
    
    if(loading){
        return <progress className="progress progress-secondary justify-center mx-auto mt-4 align-middle flex w-56" value="70" max="100"></progress>
    }
    if(user){
        return children;
    }
    return <Navigate to="/logIn" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;