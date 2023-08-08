
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const UseQuery = () =>{
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['selectClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`http://localhost:5000/selectClass?email=${user?.email}`)
            return res.data;
        },
    })

    return [cart, refetch]

}
export default UseQuery;
