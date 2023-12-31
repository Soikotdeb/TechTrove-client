
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const UseQuery = () =>{
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['useQuery', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`https://tech-trove-gadget-bazar-database.vercel.app/useQuery?email=${user?.email}`)
            return res.data;
        },
    })

    return [cart, refetch]

}
export default UseQuery;
