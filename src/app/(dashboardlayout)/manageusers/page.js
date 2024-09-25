"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () =>{
    axios.get("http://localhost:5000/users").then(res => setUsers(res.data))
  };

  const handleActiveUser = (_id)=>{

  };

  const handleBlockUser = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You can unblock this user later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block this user!"
      }).then((result) => {
        if (result.isConfirmed) {
            axios.patch(`http://localhost:5000/user/${_id}`)
            .then(res =>{
                if(res.data.modifiedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Blocked!",
                        text: "You have blocked this user.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }

  const handleDeleteUser = (_id)=>{

  }

  return (
    <div className="py-5 px-5">
      <h2 className="text-center text-3xl font-bold text-[#033f63] py-4">
        Users: {users?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={user?.image}
                          width={100}
                          height={100}
                          alt="user"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">
                        Role: {user?.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>
                    {user?.status === 'active' ? <span className='font-bold text-green-600'>{user?.status}</span> :
                    <span className='font-bold text-red-500'>{user?.status}</span>
                    }
                </td>
                <td>
                    {
                        user?.status === 'active' ? <button onClick={()=> handleBlockUser(user?._id)} className='btn btn-sm bg-red-500 text-white'>Block</button> :
                        <button onClick={()=> handleActiveUser(user?._id)} className='btn btn-sm bg-green-600 text-white'>Unblock</button>
                    }
                </td>
                
                <td className='text-red-500 font-bold'><button onClick={()=> handleDeleteUser(user?._id)}><FaRegTrashCan /></button></td>
                
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
