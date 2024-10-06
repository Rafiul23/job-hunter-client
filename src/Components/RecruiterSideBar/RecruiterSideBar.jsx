import Link from "next/link";
import { signOut } from "next-auth/react";

const RecruiterSideBar = () => {
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
        <button onClick={() => signOut()}>
            Log Out
          </button>
        <hr/>
        
      </div>
    </div>
  );
};

export default RecruiterSideBar;
