import Link from "next/link";
import { signOut } from "next-auth/react";


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
        <Link href={'/update/:id'}>
          <button>Edit Profile</button>
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

export default UserSideBar;