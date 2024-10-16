"use client";
import Image from "next/image";
import loginImage from "../../assets/login.png";
import Link from "next/link";
import { useState, Suspense  } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SocialLogin from "@/Components/SocialLogin/SocialLogin";
import { useRouter } from "next/navigation";
import useAxiosPublic from '@/hooks/useAxiosPublic';


const image_hosting_key = process.env.NEXT_PUBLIC_ImageBB_API_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {

    const [hidden, setHidden] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const axiosPublic = useAxiosPublic();
    

    const handleSignUp = async (e)=>{
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;


      if(password.length < 6){
        setError('Password must be greater than or equal to 6 character');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error}`
        });
        return;
      } else if (password.length > 20){
        setError('Password must be less than or equal to 20 character');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error}`
        });
        return;
      } else if (!passwordRegEx.test(password)){
        setError('Password must have included one small letter, one capital letter, one number and one special character!');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error}`
        });
        return;
      } else {
        setError('');
      };
     
      const data = {image: imageFile};

      // console.log( data);
      
      const imageRes = await axiosPublic.post(image_hosting_api, data, {
               headers: {
                    'Content-Type': 'multipart/form-data'
                }
          });
   

     if(imageRes.data.success){
      
       const userInfo = {
         image: imageRes.data.data.display_url,
         name,
         email,
         password,
         role: 'user',
         status: 'active'
       };

      const userRes = await axiosPublic.post('/user', userInfo)
    
       if(userRes.data.insertedId){
          router.push('/login');
          e.target.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New user created successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      
     }  
    
}
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="card bg-base-100 w-full shadow-xl">

          <form className="card-body" onSubmit={handleSignUp}>
            <h2 className='text-3xl text-center text-[#033f63] py-6 font-bold'>Sign Up Now!</h2>
            <div className='form-control'>
            <label className="label">
                <span className="label-text">Your Image:</span>
              </label>
            <input type="file" onChange={e=> setImageFile(e.target.files[0])} className="file-input file-input-bordered w-full max-w-xs" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                name='name'
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name='email'
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input
                type={ hidden ? "password" : "text"}
                placeholder="Password"
                name='password'
                className="input input-bordered"
                required
              />
            
              <p className='pt-6'>Already have an account? Please, <Link href='/login' className='text-[#033f63] font-bold underline'>Login!</Link> </p>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#033f63] text-white">Sign Up</button>
            </div>
            
          </form>

          <div className="relative -top-[195px]">
            <div className="absolute right-16">
              <button onClick={() => setHidden(!hidden)}>
                {hidden ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </button>
            </div>
          </div>

          <p className='text-center my-2'>Or</p>
          <div className='py-5 text-center'>
          
            <SocialLogin></SocialLogin>
          
          </div>

        </div>
        <div className="w-full flex justify-center items-center">
          <Image src={loginImage} alt="sign up image" width={500} height={500} />
        </div>
        
      </div>
    </div>
  );
};

export default function SignUpPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  );
} ;
