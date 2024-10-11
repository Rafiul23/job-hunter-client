'use client';
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import axios from 'axios';
import useUser from '@/hooks/useUser';


const AdminSideBar = () => {
  const router = useRouter();
  const {user} = useUser();
  const {email} = user;
  const handleSignOut = ()=>{
    axios.post('http://localhost:5000/logout', email, {
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    signOut()
    .then(res => console.log(res))
    .catch(err => console.log(err));


    router.push('/');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User logout successfully",
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  return (
    <div className="col-span-1 bg-[#033f63] h-screen w-full text-center text-white">
      <div className="grid grid-cols-1 gap-5 ">
        <hr />
        <Link href="/adminprofile">
          <button>Admin Profile</button>
        </Link>
        <hr />
        <Link href="/manageusers">
          <button>Manage Users</button>
        </Link>
        <hr />
        <Link href='/addjob'>
          <button>Add Job</button>
        </Link>
        <hr />
        <Link href="/managejobs">
          <button>Manage Jobs</button>
        </Link>
        <hr />
        <button onClick={handleSignOut}>
            Log Out
          </button>
        <hr/>
      </div>
    </div>
  );
};

export default AdminSideBar;
