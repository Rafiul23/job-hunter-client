import { FcGoogle } from "react-icons/fc";
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import axios from 'axios';

const SocialLogin = () => {
    const router = useRouter();
    const session = useSession();

    const handleSocialLogIn = (provider)=>{
        const res = signIn(provider);
    }

    if(session.status === 'authenticated'){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User login successful",
            showConfirmButton: false,
            timer: 1500
          });
          router.push('/');
    

    const userEmail = session ? session?.data?.user?.email : "";
    const userName = session ? session?.data?.user?.name : "";
    const userImage = session ? session?.data?.user?.image : "";

    const userInfo = {
        email: userEmail,
        name: userName,
        image: userImage
    }

    axios.post(`http://localhost:5000/user?email=${userEmail}`, userInfo)
    .then(res =>{
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New user created",
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User already exists!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })

    };

    

    return (
        <div>
            <button onClick={()=>handleSocialLogIn('google')} className='btn btn-outline text-[#033f63] border-[#033f63]'><FcGoogle></FcGoogle> Login with Gmail</button>
        </div>
    );
};

export default SocialLogin;