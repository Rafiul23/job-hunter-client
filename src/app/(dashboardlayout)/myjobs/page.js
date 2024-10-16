"use client";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import useAdmin from "@/hooks/useAdmin";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useHandleSignOut from "@/hooks/useHandleSignOut";

const MyJobsPage = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { user, loading } = useUser();
  const { email } = user;
  const { loading: isLoading, isRecruiter } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const handleSignOut = useHandleSignOut();

  useEffect(() => {
    if (email) {
      axiosSecure
        .get(`/my-jobs?email=${email}`)
        .then((res) => setMyJobs(res.data));
    }
  }, [user, email, axiosSecure]);

  if (loading || isLoading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else if (!isRecruiter) {
    return handleSignOut();
  } else {
    return (
      <div className="py-4">
        <h1 className="lg:text-5xl md:text-3xl text-2xl text-[#033f63] font-bold text-center my-4">
          My Jobs: {myJobs.length}
        </h1>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Company Name</th>
                  <th>Job Title</th>
                  <th>Deadline</th>
                  <th>Job Link</th>
                  <th>View Applications</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job, i) => (
                  <tr key={job._id}>
                    <th>{i + 1}</th>
                    <td>{job?.company_name}</td>
                    <td>{job?.job_title}</td>
                    <td className="text-red-500 font-bold">{job?.deadline}</td>
                    <td className="underline text-blue-500 font-semibold">
                      <a
                        href={`https://job-hunter-globe.vercel.app/jobs/${job?._id}`}
                      >
                        Link
                      </a>
                    </td>
                    <td>
                      <Link href={`/resumes/${job?._id}`}>
                        <button className="btn btn-md bg-[#033f63] text-white">
                          View Applications
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default MyJobsPage;
