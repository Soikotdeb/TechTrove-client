
import { useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from './useAxiosSecure';

// UseAdmin hook
const UseAdmin = () => {
  const { user } =useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const adminRes = await axiosSecure.get(`/users/admin/${user?.email}`);
      return adminRes.data.admin;
    }
  });

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ['isInstructor', user?.email],
    queryFn: async () => {
      const instructorRes = await axiosSecure.get(`/users/instructor/${user?.email}`);
      return instructorRes.data.instructor;
    }
  });

  const isAdminOrInstructor = isAdmin ? "admin" : isInstructor ? "instructor" : "user";
  const isLoading = isAdminLoading || isInstructorLoading;

  return [isAdminOrInstructor, isLoading];
};

export default UseAdmin;

