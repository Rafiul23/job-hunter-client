"use client";
import Image from "next/image";
import loginImage from "../../assets/login.png";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import SocialLogin from "@/Components/SocialLogin/SocialLogin";
import axios from 'axios';
import { Suspense } from 'react';


const Login = () => {
  const [hidden, setHidden] = useState(true);
  const searchParams = useSearchParams();
  const path = searchParams.get('redirect');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : '/'
    });
  
    const userInfo = {email};
     axios.post('http://localhost:5000/jwt', userInfo, {
      withCredentials: true
     }).then(res => {
      console.log(res.data)
     }).catch(err=>{
      console.log(err)
     }) 
    
    
  };

  return (
    
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full flex justify-center items-center">
          <Image src={loginImage} alt="login image" width={500} height={500} />
        </div>
        <div className="card bg-base-100 w-full shadow-xl">
          <form className="card-body" onSubmit={handleLogin}>
            <h2 className="text-3xl text-center text-[#033f63] py-6 font-bold">
              Login Now!
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={hidden ? "password" : "text"}
                placeholder="Password"
                name="password"
                className="input input-bordered"
                required
              />
              <p className="pt-6">
                New to Job Hunter? Please,{" "}
                <Link
                  href="/signup"
                  className="text-[#033f63] font-bold underline"
                >
                  Sign Up!
                </Link>{" "}
              </p>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#033f63] text-white">Login</button>
            </div>
          </form>

          <div className="relative -top-[195px]">
            <div className="absolute right-16">
              <button onClick={() => setHidden(!hidden)}>
                {hidden ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </button>
            </div>
          </div>
          <p className="text-center my-2">Or</p>
          <div className="py-5 text-center">
          <Suspense fallback={<div>Loading...</div>}>
            <SocialLogin></SocialLogin>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  
    
  );
};

export default Login;
