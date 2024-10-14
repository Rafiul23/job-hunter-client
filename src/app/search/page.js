"use client";
import JobCard from "@/Components/JobCard/JobCard";
import CoverImage from '@/Components/CoverImage/CoverImage'
import SectionTitle from '@/Components/SectionTitle/SectionTitle'
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Search = () => {
  const [displayJobs, setDisplayJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const axiosPublic = useAxiosPublic();


  const handleSearchJobs = async (e) => {
    e.preventDefault();

    const searchContent = e.target.search.value.trim();

    if (searchContent === "") {
      return;
    } else {
      
      axiosPublic.get(`/search?title=${searchContent}`)
      .then(res => {
        setSearchResult(res.data);
        setDisplayJobs(res.data);
      });

      // console.log(searchResult);
      if (searchResult.length === 0) {
        setMessage("No result found!");
      } else {
        setMessage('');
      }
    }
  };

  return (
    <div className="py-10">
      <CoverImage></CoverImage>
      <SectionTitle
      title='Search Your Dream Jobs'
      ></SectionTitle>
      
      <p className="py-2 text-center text-xl"> Search jobs by job title.</p>
      <div className="py-4 text-center">
        <form onSubmit={handleSearchJobs}>
          <input
            type="text"
            placeholder="Type here"
            name="search"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button className="btn bg-[#033f63] text-white ml-2">Search</button>
        </form>
      </div>

      {displayJobs.length === 0 ? (
        <div className="text-red-500 text-center font-semibold py-4 text-xl">
          {message}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
          {displayJobs?.map((job) => (
            <JobCard job={job} key={job._id}></JobCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
