import Link from "next/link";

const AdminSideBar = () => {
    return (
        <div className="col-span-1 bg-[#033f63] h-[600px] w-full text-center text-white">
        <div className="grid grid-cols-1 gap-5 ">
          <hr />
          <Link href='/adminprofile'><button>Admin Profile</button></Link>
          <hr />
          <button>Edit Admin Profile</button>
          <hr />
          <button>Manage Users</button>
          <hr />
          <button>Add Job</button>
          <hr />
          <button>Manage Jobs</button>
          <hr />
          <button>Home</button>
          <hr />
        </div>
      </div>
    );
};

export default AdminSideBar;