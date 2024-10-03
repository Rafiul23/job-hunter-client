
import Link from "next/link";

const RecruiterSideBar = () => {
  return (
    <div className="col-span-1 bg-[#033f63] h-screen w-full text-center text-white">
      <div className="grid grid-cols-1 gap-5 ">
        <hr />
        <Link href="/recruiterprofile">
          <button>Recruiter Profile</button>
        </Link>
        <hr />
        <Link href='/addjob'>
          <button>Add Job</button>
        </Link>
        <hr />
        <Link href="/managemyjobs">
          <button>Manage My Jobs</button>
        </Link>
        <hr />
        <Link href="/managemyjobs">
          <button>Received Applications</button>
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default RecruiterSideBar;
