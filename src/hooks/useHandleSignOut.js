'use client';
import Swal from 'sweetalert2';
import axios from 'axios';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const useHandleSignOut = ()=>{
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
   return  handleSignOut;
}
export default useHandleSignOut;    