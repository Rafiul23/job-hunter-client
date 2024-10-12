'use client';
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect } from "react";


const SocialLogin = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const axiosPublic = useAxiosPublic();

  const handleSocialLogIn = async(provider) => {
      
      const res = await signIn(provider, {
          redirect: true,  
          callbackUrl: '/login'  
      });
      
    }

  useEffect(() => {
    if (session.status === "authenticated") {
      const userEmail = session ? session?.data?.user?.email : "";
      const userName = session ? session?.data?.user?.name : "";
      const userImage = session ? session?.data?.user?.image : "";

      const userInfo = {
        email: userEmail,
        name: userName,
        image: userImage,
        role: "user",
      };

      axiosPublic.post(`/user?email=${userEmail}`, userInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New user created",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User already exists!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

      const user_Info = { email: userEmail };
      axios.post("http://localhost:5000/jwt", user_Info, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, axiosPublic]);
  
  return (
    <div>
      <button
        onClick={() => handleSocialLogIn("google")}
        className="btn btn-outline text-[#033f63] border-[#033f63]"
      >
        <FcGoogle></FcGoogle> Login with Gmail
      </button>
    </div>
  );
};

export default SocialLogin;
