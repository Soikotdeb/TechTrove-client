import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
const {user,loading}= useContext(AuthContext)

// const token = localStorage.getItem('access-token')
const [axiosSecure] = useAxiosSecure();

const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    enabled:!loading,
    // queryFn: async () => {
    //     const res = await fetch(`https://bistro-boss-server-orcin.vercel.app/carts?email=${user?.email}`,{headers:{
    //         authorization: `bearer ${token}`
    //     }})
    //     return res.json();
    // },
    queryFn: async () => {
        const res = await axiosSecure(`/carts?email=${user?.email}`)
        return res.data;
    },
})

return [cart, refetch]

}
export default useCart;
