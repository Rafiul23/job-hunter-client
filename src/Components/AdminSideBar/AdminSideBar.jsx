
import Link from "next/link";

const AdminSideBar = () => {
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
      </div>
    </div>
  );
};

export default AdminSideBar;
