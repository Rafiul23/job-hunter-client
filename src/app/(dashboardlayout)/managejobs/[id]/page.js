"use client";
import { useState } from "react";
import axios from 'axios';

const UpdateJobPage = ({params})=>{

    const [job, setJob] = useState([]);  
    
    axios.get(`http://localhost:5000/job/${params?.id}`)
    .then(res => setJob(res.data))

    const {
        company_name,
        job_title,
        job_description,
        location,
        experience,
        qualifications,
        salary_range,
        _id,
        deadline,
        category,
        onsite_or_remote,
        job_type,
        employer_email,
        job_post
      } = job;

    return (
        <div className='py-5'>
            <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
            Update {job_title} Job 
            </h2>

            <form className="p-4 bg-base-200">
               <div className='flex md:flex-row flex-col gap-4 mb-2'>

               </div>
            </form>
        </div>
    );
};

export default UpdateJobPage