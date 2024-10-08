"use client";
import Link from "next/link";
import useUser from '@/hooks/useUser';
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";


const Navbar = () => {
  const { data: session, status } = useSession();  // console.log(session);
  const {user, loading} = useUser();
  //  console.log(user);
   const { name} = user;
  //  console.log(user);

  if (status === 'authenticated') {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login successful",
      showConfirmButton: false,
      timer: 1500,
    });
  }


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
            status === 'loading' ? <progress className="progress progress-success w-56"></progress>: !session ? <p>No session found</p> : <p>{name}</p>

          }
         
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
