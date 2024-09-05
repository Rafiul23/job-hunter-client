"use client";

import { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";

const HotJobs = () => {

    const [hotJobs, setHotJobs] = useState([]);

    useEffect(()=>{
        fetch('hotjobs.json')
        .then(res => res.json())
        .then(data => setHotJobs(data))
    }, [])

  return (
    <div className="py-10">
      <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">
        Hot Jobs: {hotJobs.length}
      </h1>
        <p className='text-center text-2xl mb-4'>Search your favourite jobs from here.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4'>
            {
                hotJobs.map(job => <JobCard job={job} key={job._id}></JobCard>)
            }
        </div>
    </div>
  );
};

export default HotJobs;
