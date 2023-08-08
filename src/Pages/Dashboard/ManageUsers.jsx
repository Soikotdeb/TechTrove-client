
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="p-2 bg-gray-800 text-white w-full">
       <h1 className="text-2xl font-semibold mb-2  text-center border border-green-300">
        Total Users {users.length}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {users.map((user) => (
          <div key={user._id} className="border rounded p-4 shadow-md bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <img
              src={user?.image}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <p className="text-sm font-semibold mb-1">Name: {user.name}</p>
            <p className="text-gray-400 mb-1">Gmail: {user.email}</p>
            <p className="text-blue-300 mb-3">Role: {user.role}</p>
            <div className="flex justify-center space-x-2">
              <Link
                to={`/make-admin/${user._id}`}
                className="text-green-300 hover:underline"
              >
                Make Admin
              </Link>
              <Link
                to={`/make-instructor/${user._id}`}
                className="text-blue-300 hover:underline"
              >
                Make Instructor
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
