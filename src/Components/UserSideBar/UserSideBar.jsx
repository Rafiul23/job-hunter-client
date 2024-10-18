'use client';
import Link from "next/link";
import useHandleSignOut from "@/hooks/useHandleSignOut";

const UserSideBar = () => {
  
  const handleSignOut = useHandleSignOut();
  
    return (
        <div className="col-span-1 z-[5] bg-[#033f63] h-screen w-full text-center text-white">
      <div className="grid grid-cols-1 gap-5 ">
        <hr />
        <Link href="/userprofile">
          <button>User Profile</button>
        </Link>
        <hr />
        <Link href="/appliedjobs">
          <button>Applied Jobs</button>
        </Link>
        <hr />
        
        <button onClick={handleSignOut}>
            Log Out
        </button>
        <hr/>
      </div>
    </div>
    );
};

export default UserSideBar;