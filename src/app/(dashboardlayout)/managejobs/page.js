"use client";
import axios from "axios";
import { useState } from "react";

const ManageJobs = ()=>{
    const [totalCount, setTotalCount] = useState([]);

    axios.get('http://localhost:5000/jobsCount')
    .then(res => setTotalCount(res.data));

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

        </div>
    )
}

export default ManageJobs;