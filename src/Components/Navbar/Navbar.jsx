"use client";
import Link from "next/link";
import useUser from '@/hooks/useUser';
import { useSession } from "next-auth/react";
import {useState} from 'react';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { data: session, status } = useSession(); 
   // console.log(session);
   const [hidden, setHidden] = useState(true);
  const {user, loading} = useUser();
  //  console.log(user);
   const { name} = user;
  //  console.log(user);


  const navlinks = (
    <>
      <li className='py-2 max-lg:border-b-2'>
        <Link href="/">Home</Link>
      </li>
      <li className='py-2 max-lg:border-b-2'>
        <Link href="/search">Search Jobs</Link>
      </li>
      <li className='py-2 max-lg:border-b-2'>
        <Link href="/favourite">Favourite Jobs</Link>
      </li>
      <li className='py-2'>
      <Link href="/dashboard">Dashboard</Link>
      </li>

    </>
  );

  return (
    <div className="navbar bg-[#033F63] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="bg-[#033f63] lg:hidden"
          >
            <button className='text-xl' onClick={()=> setHidden(!hidden)}>
            {
              hidden ?  <LuMenu /> : <IoMdClose />
            }
            </button>
          </div>
          <ul
            tabIndex={0}
            className={ hidden ? `hidden` : `menu menu-sm dropdown-content bg-[#033f63] border-white border-2 rounded-box z-[1] mt-3 w-52 shadow`}
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl" href="/">
          Job Hunter
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        
        {user.length === 0 ? (
          <Link href="/login" className="btn">
            Login
          </Link>
        ) : (
          <div className="mx-4 ">
          
          {
            status === 'loading' ? <progress className="progress progress-success w-56"></progress>: !session ? <Link href="/login" className="btn">
            Login
          </Link> : <p>{name}</p>

          }
         
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
