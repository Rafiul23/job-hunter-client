"use client";
import Image from "next/image";
import loginImage from "../../assets/login.png";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

    const [hidden, setHidden] = useState(true);

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full flex justify-center items-center">
          <Image src={loginImage} alt="login image" width={500} height={500} />
        </div>
        <div className="card bg-base-100 w-full shadow-xl">

          <form className="card-body">
            <h2 className='text-3xl text-center text-[#033f63] py-6 font-bold'>Login Now!</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={ hidden ? "password" : "text"}
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <p className='pt-6'>New to Job Hunter? Please, <Link href='/signup' className='text-[#033f63] font-bold underline'>Sign Up!</Link> </p>
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

        </div>
      </div>
    </div>
  );
};

export default Login;
