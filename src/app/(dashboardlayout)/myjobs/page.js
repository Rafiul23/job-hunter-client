"use client";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import axios from "axios";
import Link from "next/link";

const MyJobsPage = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { user, loading } = useUser();
  const { email } = user;

  useEffect(() => {
    axios.get(`http://localhost:5000/my-jobs?email=${email}`)
      .then((res) => setMyJobs(res.data));
  }, [user, email]);

  if (loading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else {
    return (
      <div className="py-4">
        <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
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
                      <a href={`http://localhost:3000/jobs/${job?._id}`}>Link</a>
                    </td>
                    <td>
                    <Link href={`/resumes/${job?._id}`}>
                        <button className='btn btn-md bg-[#033f63] text-white'>
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
