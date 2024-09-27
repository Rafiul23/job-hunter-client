"use client";
import axios from "axios";
import { useState } from "react";

const ManageJobs = ()=>{
    const [totalCount, setTotalCount] = useState([]);
    const [jobs, setJobs] = useState([]);

    axios.get('http://localhost:5000/jobsCount')
    .then(res => setTotalCount(res.data));

    axios.get('http://localhost:5000/jobs')
    .then(res => setJobs(res.data));

    const jobsPerPage = 12;
    const {count} = totalCount;
    const numberOfPages = Math.ceil(count / jobsPerPage);

    const pages = [];
    for(let i = 0; i < numberOfPages; i++ ){
        pages.push(i);
    }
   

    return (
        <div className='py-5'>
           <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Manage Jobs
           </h2>
        <div className='space-x-2 mx-auto'>
            {
                pages.map(page => <button key={page} className='btn'>{page}</button>)
            }
        </div>
        </div>
    )
}

export default ManageJobs;