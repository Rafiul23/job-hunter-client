'use client';
import Image from "next/image";
import corporateImage from "../../assets/globalisation-1014524_1280.png";
import JobCard from "@/Components/JobCard/JobCard";
import {useState, useEffect} from 'react';
import axios from 'axios';

const Jobs = ({params, searchParams}) => {

  const [displayJobs, setDisplayJobs] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(()=>{
    axios.get(`http://localhost:5000/jobs?category=${searchParams?.category}`)
    .then(res=> setDisplayJobs(res.data))
  }, [searchParams])

  const TabArray = ['All Jobs', 'On Site', 'Remote', 'Hybrid', 'Full Time', 'Part Time'];

  const handleClick = (tab, index) =>{
    setActive(index);
  }

  

  return (
    <div className="py-10">
        <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">
        Job Category:{searchParams.category}
      </h1>
      <p className='py-5 text-center text-2xl'><span className='font-bold'>{displayJobs?.length}</span> jobs found under <span className='font-bold'>{searchParams.category} </span> category</p>

      <div className='flex flex-wrap gap-4'>
      {
        TabArray.map((tab, index)=> <button className={`btn ${active === index ? 'bg-[#033f63] text-white' : ''}`} onClick={()=> handleClick(tab, index)}>{tab}</button>)
      }
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4'>
            {
                displayJobs.map(job => <JobCard job={job} key={job._id}></JobCard>)
            }
        </div>
    </div>
  );
};

export default Jobs;
