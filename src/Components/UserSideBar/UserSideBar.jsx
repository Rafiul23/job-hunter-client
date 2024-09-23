import Link from "next/link";


const UserSideBar = () => {
    return (
        <div className="col-span-1 bg-[#033f63] h-screen w-full text-center text-white">
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
        <Link href={`/update/${_id}`}>
          <button>Edit Profile</button>
        </Link>
        <hr />
      </div>
    </div>
    );
};

export default UserSideBar;