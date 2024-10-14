"use client";
import JobCard from "@/Components/JobCard/JobCard";
import { useState, useEffect } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import CoverImage from '@/Components/CoverImage/CoverImage'

export const metadata = {
  title: searchParams.category,
  description: 'This page is giving jobs by category'
}

const JobsByCategory = ({ params, searchParams }) => {
  const [jobsByCategory, setJobsByCategory] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [active, setActive] = useState(0);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/jobs?category=${searchParams?.category}`)
    .then((res) => {
      setJobsByCategory(res.data);
      setDisplayJobs(res.data);
    });
  }, [searchParams, axiosPublic]);



  const TabArray = [
    "All Jobs",
    "On Site",
    "Remote",
    "Hybrid",
    "Full Time",
    "Part Time",
  ];

  const handleClick = (tab, index) => {
    setActive(index);
    handleTabOption(tab);
  };

  const onsite = jobsByCategory.filter(
    (job) => job.onsite_or_remote === "Onsite"
  );
  const remote = jobsByCategory.filter(
    (job) => job.onsite_or_remote === "Remote"
  );
  const hybrid = jobsByCategory.filter(
    (job) => job.onsite_or_remote === "Hybrid"
  );
  const fullTime = jobsByCategory.filter((job) => job.job_type === "Full Time");
  const partTime = jobsByCategory.filter((job) => job.job_type === "Part Time");

  const handleTabOption = (tab= 'All Jobs') => {
    if(tab === 'All Jobs'){
      setDisplayJobs(jobsByCategory);
    } else if (tab === "On Site") {
      setDisplayJobs(onsite);
    } else if (tab === "Remote") {
      setDisplayJobs(remote);
    } else if (tab === "Hybrid") {
      setDisplayJobs(hybrid);
    } else if (tab === "Full Time") {
      setDisplayJobs(fullTime);
    } else if (tab === "Part Time") {
      setDisplayJobs(partTime);
    } 
  };

  return (
    <div className="py-10">
      <CoverImage></CoverImage>
      <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center my-4">
        Job Category: {searchParams.category}
      </h1>
      <p className="py-5 text-center text-2xl">
        <span className="font-bold">{displayJobs?.length}</span> jobs found
        under <span className="font-bold">{searchParams.category} </span>
        category
      </p>

      <div className="flex flex-wrap gap-4">
        {TabArray.map((tab, index) => (
          <button
            key={index}
            className={`btn ${
              active === index ? "bg-[#033f63] text-white" : ""
            }`}
            onClick={() => handleClick(tab, index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {displayJobs.map((job) => (
          <JobCard job={job} key={job._id}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default JobsByCategory;
