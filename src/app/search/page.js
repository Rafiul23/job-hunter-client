"use client";
import Image from "next/image";
import corporateImage from "../../assets/globalisation-1014524_1280.png";
import JobCard from "@/Components/JobCard/JobCard";
import { useState } from "react";

const Search = () => {
  const [displayJobs, setDisplayJobs] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearchJobs = async (e) => {
    e.preventDefault();

    const searchContent = e.target.search.value;

    if (searchContent === "") {
      return;
    } else {
      const res = await fetch(
        `http://localhost:5000/search?title=${searchContent}`
      );

      const searchResult = await res.json();

      // console.log(searchResult);
      if (searchResult.length === 0) {
        setMessage("No result found!");
      } else {
        setDisplayJobs(searchResult);
      }
    }
  };

  return (
    <div className="py-10">
      <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
        Search Your Dream Jobs
      </h1>
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
