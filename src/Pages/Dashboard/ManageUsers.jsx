

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageUsers = () => {
  // const [users, setUsers] = useState([]);
  const [adminButtonDisabled, setAdminButtonDisabled] = useState(false);
  const [instructorButtonDisabled, setInstructorButtonDisabled] = useState(false);
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  // second way to handle manage user data load--------------------

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/users");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUsers(data);
  //       } else {
  //         console.log("Error:", response.status);
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleAdmin = (user) => {
    setAdminButtonDisabled(true);

    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now an Admin`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAdminButtonDisabled(false);
      });
  };
  const handleInstructor = (user) => {
    setInstructorButtonDisabled(true);

    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now an Instructor`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setInstructorButtonDisabled(false);
      });
  };

  return (
    <div className="p-2 bg-gray-800 text-white w-full">
       <h1 className="text-2xl font-semibold mb-2  text-center border border-green-300">
        Total Users {users.length}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {users.map((user) => (
          <div key={user._id} className="border rounded p-4 shadow-md bg-gray-700 hover:bg-gray-800 transition-colors duration-300">
            <img
              src={user?.image}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <p className="text-sm font-semibold mb-1">Name: {user.name}</p>
            <p className="text-gray-400 mb-1">Gmail: {user.email}</p>
            <p className="text-blue-300 mb-3">Role: {user.role}</p>
            <div className="flex justify-center space-x-10 gap-5 ">
            {user.role === "admin" ? (
                    "admin"
                  ) : (
              <Link
              onClick={() => handleAdmin(user)}
              disabled={adminButtonDisabled}
                // to={`/make-admin/${user._id}`}
                className="text-green-300 hover:underline flex items-center"
              >
              <FaUserShield />Make Admin
              </Link>
              )}

        {user.role === "instructor" ? (
                    "instructor"
                  ) : (
              <Link
              onClick={() => handleInstructor(user)}
              disabled={instructorButtonDisabled}
                // to={`/make-instructor/${user._id}`}
                className="text-blue-300 hover:underline flex items-center"
              >
                Make Instructor<FaChalkboardTeacher/>
              </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
