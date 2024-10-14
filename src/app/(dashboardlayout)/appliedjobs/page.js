'use client';
import {useState, useEffect} from 'react';
import { useSession } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";


const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const session = useSession();
    const userEmail = session ? session?.data?.user?.email : "";
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
      if(userEmail){
        axiosSecure.get(`/applied-jobs?email=${userEmail}`)
        .then(res =>setAppliedJobs(res.data))
      }
    }, [session, userEmail, axiosSecure])

    return (
        <div className='py-4'>
             <h1 className="lg:text-5xl md:text-3xl text-2xl text-[#033f63] font-bold text-center my-4">
                Applied Jobs: {appliedJobs.length}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                appliedJobs.map((job, i) => <tr key={job._id}>
                    <th>{i + 1}</th>
                    <td>{job?.company_name}</td>
                    <td>{job?.job_title}</td>
                    <td className='text-red-500 font-bold'>{job?.apply_date}</td>
                    <td className='underline text-blue-500 font-semibold'><a href={job?.jobLink}>Job Link</a></td>
                    <td className='underline text-blue-500 font-semibold'><a target='_blank' href={job?.resumeLink}>Resume Link</a></td>
                  </tr>)
              }
             
             
            </tbody>
          </table>
        </div>
      </div>
        </div>
    );
};

export default AppliedJobs;