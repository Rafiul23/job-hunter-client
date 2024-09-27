"use client";
import axios from "axios";
import { useState } from "react";

const ManageJobs = ()=>{
    const [totalCount, setTotalCount] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobsPerPage, setJobsPerPage] = useState(10);

    axios.get('http://localhost:5000/jobsCount')
    .then(res => setTotalCount(res.data));

    axios.get('http://localhost:5000/jobs')
    .then(res => setJobs(res.data));

   
    const {count} = totalCount;
    const numberOfPages = Math.ceil(count / jobsPerPage);

    const pages = [];
    for(let i = 0; i < numberOfPages; i++ ){
        pages.push(i);
    }
   
    const handleJobsPerPage = e =>{
        const val = parseInt(e.target.value);
        setJobsPerPage(val);
    }

    return (
        <div className='py-5'>
           <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Manage Jobs
           </h2>

        <div className='py-4'>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Deadline</th>
                <th>Update Job</th>
                <th>Delete Job</th>
              </tr>
            </thead>
            <tbody>
              {
                jobs.map((job, i) => <tr key={job._id}>
                    <th>{i + 1}</th>
                    <td>{job?.company_name}</td>
                    <td>{job?.job_title}</td>
                    <td className='text-red-500 font-bold'>{job?.deadline}</td>
                    {/* <td className='underline text-blue-500 font-semibold'><a href={job?.jobLink}>Link</a></td>
                    <td className='text-red-500 font-bold'><button onClick={()=> handleDeleteFavJobs(job._id)}><FaRegTrashCan /></button></td> */}
                  </tr>)
              }
             
             
            </tbody>
          </table>
        </div>
        </div> 
        <div className='space-x-2 flex justify-center py-4'>
            {
                pages.map(page => <button key={page} className='btn'>{page}</button>)
            }
            <select className="select select-bordered w-[80px]" value={jobsPerPage} onChange={handleJobsPerPage}>
                <option value='10'>10</option>
                <option value='12'>12</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
            </select>
        </div>
        </div>
    )
}

export default ManageJobs;