import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';


const AdminSideBar = () => {
  const router = useRouter();

  const handleSignOut = ()=>{
    signOut();
    router.push('/');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User logout successfully",
      showConfirmButton: false,
      timer: 1500
    });
  }
  
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
};

export default AdminSideBar;
