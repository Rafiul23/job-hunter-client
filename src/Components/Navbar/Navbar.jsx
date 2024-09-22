"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {useState, useEffect} from 'react';
import axios from 'axios';

const Navbar = () => {
  const session = useSession();
  // console.log(session);
  const [user, setUser] = useState([]);

  const userEmail = session ? session?.data?.user?.email : "";
  const userName = session ? session?.data?.user?.name : "";
  // const userImage = session ? session?.data?.user?.image : "";

 useEffect(()=>{
  axios.get(`http://localhost:5000/user?email=${userEmail}`)
  .then(res => setUser(res.data))
 }, [userEmail])

  // console.log(user);
  
  const navlinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/search">Search Jobs</Link>
      </li>
      <li>
        <Link href="/favourite">Favourite Jobs</Link>
      </li>
      <li>
        {
          user?.role === 'admin' ? <Link href="/admindashboard">Dashboard</Link> :
          <Link href="/userdashboard">Dashboard</Link>
        }
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
            className="btn bg-[#033f63] lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#033f63]  rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl" href="/">
          Job Hunter
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="mx-4 ">
          {/* <Image src={userImage} height={10} width={10} alt="user" /> */}
          <p>{userName}</p>
          <p>{userEmail}</p>
        </div>
        {!session.data ? (
          <Link href="/login" className="btn">
            Login
          </Link>
        ) : (
          <button onClick={() => signOut()} className="btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
