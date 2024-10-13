"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegTrashCan, FaUser, FaUserTie   } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useAdmin from "@/hooks/useAdmin";
import { signOut } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { isAdmin, loading } = useAdmin();
  const axiosSecure = useAxiosSecure();

  const loadUsers = useCallback(() =>{
    axiosSecure.get("/users")
    .then(res => setUsers(res.data))
  }, [axiosSecure]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleActiveUser = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to unblock this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unblock this user!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user/active/${_id}`)
            .then(res =>{
                if(res.data.modifiedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Unblocked!",
                        text: "You have unblocked this user.",
                        icon: "success"
                      });
                }
            })
        }
      });
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
          axiosSecure.patch(`/user/block/${_id}`)
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
    Swal.fire({
        title: "Are you sure?",
        text: "You can not revert this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete this user!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/user/${_id}`)
            .then(res =>{
                if(res.data.deletedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Deleted!",
                        text: "You have deleted this user.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }

  const handleMakeAdmin = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You can revert this user later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make this user an Admin!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/admin/${_id}`)
            .then(res =>{
                if(res.data.modifiedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Success!",
                        text: "You have made this user an Admin.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }

  const handleMakeRecruiter = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You can revert this user later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make this user a Recruiter!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/recruiter/${_id}`)
            .then(res =>{
                if(res.data.modifiedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Success!",
                        text: "You have made this user a recruiter.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }

  const handleMakeUser = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You can revert this user later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make this person a user!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/user/${_id}`)
            .then(res =>{
                if(res.data.modifiedCount > 0){
                    loadUsers();
                    Swal.fire({
                        title: "Success!",
                        text: "You have made this person a user.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }



  if(loading){
    return <progress className="progress progress-success w-56"></progress>;
  }
  
  if(!isAdmin){
    return signOut();
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
              <th>Make <br/> Admin</th>
              <th>Make <br/> Recruiter</th>
              <th>Make <br/> User</th>
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
                        {
                          user?.image && <Image
                          src={user?.image}
                          width={100}
                          height={100}
                          alt="user"
                        />
                        }
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
                <td className='text-green-600 text-center'>
                    {
                      user?.role === 'admin' ? <p>Admin</p> : <button onClick={()=>handleMakeAdmin(user?._id)} className='text-xl'><FaUser /></button>
                    }    
                </td>
                <td className='text-[#033f63] text-center'>
                    {
                      user?.role === 'recruiter' ? <p>Recruiter</p> : <button className='text-xl' onClick={()=> handleMakeRecruiter(user?._id)}><FaUserTie /></button>
                    }
                </td>
                <td className='text-center'>
                    {
                      user?.role !== 'user' ? <button className='text-xl' onClick={()=> handleMakeUser(user?._id)}><FaUser /></button> : <p>User</p> 
                    }    
                </td>
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
