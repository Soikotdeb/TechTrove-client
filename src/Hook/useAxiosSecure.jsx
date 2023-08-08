
import axios from "axios";
// import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

 const axiosSecure = axios.create({
//    baseURL: 'https://creativescanvas.vercel.app', 
   baseURL: 'http://localhost:5000/', 
 });
 const useAxiosSecure = () => {
   const { logOut } = useContext(AuthContext)
   const navigate = useNavigate(); 
   useEffect(() => {
     axiosSecure.interceptors.request.use((config) => {
       const token = localStorage.getItem('canvas-access-token');
       if (token) {
         config.headers.Authorization = `${token}`;
       }
       return config;
     });
     axiosSecure.interceptors.response.use(
       (response) => response,
       async (error) => {
         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
           await logOut();
           navigate('/login');
         }
         return Promise.reject(error);
       }
     );
   }, [logOut, navigate]);
   return [axiosSecure];
 };
 export default useAxiosSecure; 