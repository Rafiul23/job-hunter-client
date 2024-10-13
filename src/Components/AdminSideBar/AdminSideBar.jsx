'use client';
import Link from "next/link";
import useHandleSignOut from "@/hooks/useHandleSignOut";
import useAdmin from "@/hooks/useAdmin";


const AdminSideBar = () => {
  const {isAdmin, loading} = useAdmin();
  const handleSignOut = useHandleSignOut();
  
  if(loading){
    return <progress className="progress progress-success w-56"></progress>;
  } else if(!isAdmin){
    return handleSignOut();
  } else {
    return (
      <div className="col-span-1 bg-[#033f63] h-screen w-full text-center text-white">
        <div className="grid grid-cols-1 gap-5 ">
          <hr />
          <Link href="/adminprofile">
            <button>Admin Profile</button>
          </Link>
          <hr />
          <Link href="/manageusers">
            <button>Manage Users</button>
          </Link>
          <hr />
          <Link href='/addjob'>
            <button>Add Job</button>
          </Link>
          <hr />
          <Link href="/managejobs">
            <button>Manage Jobs</button>
          </Link>
          <hr />
          <button onClick={handleSignOut}>
              Log Out
            </button>
          <hr/>
        </div>
      </div>
    );
  }
  
};

export default AdminSideBar;
