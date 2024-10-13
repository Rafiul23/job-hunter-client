"use client";
import useHandleSignOut from "@/hooks/useHandleSignOut";
import useAdmin from "@/hooks/useAdmin";
import Link from "next/link";

const RecruiterSideBar = () => {
  const handleSignOut = useHandleSignOut();
  const {isRecruiter, loading} = useAdmin();

  if(loading){
    return <progress className="progress progress-success w-56"></progress>;
  } else if(!isRecruiter){
    return handleSignOut();
  } else {
    return (
      <div className="col-span-1 bg-[#033f63] h-screen w-full text-center text-white">
        <div className="grid grid-cols-1 gap-5 ">
          <hr />
          <Link href="/recruiterprofile">
            <button>Recruiter Profile</button>
          </Link>
          <hr />
          <Link href="/myjobs">
            <button>My Jobs</button>
          </Link>
          <hr />
          <button onClick={handleSignOut}>Log Out</button>
          <hr />
        </div>
      </div>
    );
  }

};

export default RecruiterSideBar;
