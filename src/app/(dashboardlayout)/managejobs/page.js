"use client";
import { useState, useEffect, useCallback } from "react";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { FaRegTrashCan, FaArrowUpLong, FaArrowDownLong  } from "react-icons/fa6";
import Swal from "sweetalert2";
import Link from "next/link";
import useAdmin from "@/hooks/useAdmin";
import { signOut } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosPublic from "@/hooks/useAxiosPublic";


const ManageJobs = () => {
  const [totalCount, setTotalCount] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { isAdmin, loading:isLoading } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [searchResult, setSearchResult] = useState([]);

  const loadTotalCount = useCallback(() => {
    axiosPublic.get("/jobsCount")
      .then((res) => setTotalCount(res.data))
      .catch((err) => console.log(err));
  }, [axiosPublic]);

  const loadJobs = useCallback((currentPage, jobsPerPage) => {
    axiosPublic.get(
        `/jobs/paginated?page=${currentPage}&size=${jobsPerPage}`
      )
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosPublic]);

  useEffect(() => {
    loadTotalCount();
  }, [loadTotalCount]);

  useEffect(() => {
    loadJobs(currentPage, jobsPerPage);
  }, [currentPage, jobsPerPage, loadJobs]);

  const { count } = totalCount;
  const numberOfPages = Math.ceil(count / jobsPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  const handleJobsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setJobsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteJob = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/jobs/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            loadTotalCount();
            setCurrentPage(0);
            setJobsPerPage(10);
            loadJobs(currentPage, jobsPerPage);
            Swal.fire({
              title: "Deleted!",
              text: "The job has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpgradeJob = (_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upgrade this job to hot job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upgrade it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/jobs/hot/${_id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            loadTotalCount();
            // setCurrentPage(0);
            // setJobsPerPage(10);
            loadJobs(currentPage, jobsPerPage);
            Swal.fire({
              title: "Upgraded!",
              text: "The job has become a hot job.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDowngradeJob = (_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to downgrade this job from hot job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, downgrade it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/jobs/gen/${_id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            loadTotalCount();
            setCurrentPage(0);
            setJobsPerPage(10);
            loadJobs(currentPage, jobsPerPage);
            Swal.fire({
              title: "Success!",
              text: "The job has become a general job.",
              icon: "success",
            });
          }
        });
      }
    });
  }

  const handleSearchJobs = async (e) => {
    e.preventDefault();

    const searchContent = e.target.search.value.trim();

    if (searchContent === "") {
      return;
    } else {

      axiosPublic.get(`/search?title=${searchContent}`)
      .then(res => {
        setSearchResult(res.data);
        setJobs(res.data);
    })

      // console.log(searchResult);
      if (searchResult.length === 0) {
        setMessage("No result found!");
      } else {
        setMessage('');
      }
    }
  };

  if (loading || isLoading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else if (!isAdmin){
    return signOut();
  }

  return (
    <div className="py-5">
      <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Manage Jobs {count}
      </h2>

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

      {
        jobs?.length === 0 ? (
          <div className="text-red-500 text-center font-semibold py-4 text-xl">
          {message}
        </div>
        ) : (
      <>
<div className="py-4">
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
                <th>Upgrade / <br/> Downgrade</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <tr key={job._id}>
                  <th>{i + 1}</th>
                  <td>{job?.company_name} 
                  </td>
                  <td className={job?.status === 'hot' ? 'text-orange-500 font-bold' : ""}>{job?.job_title}</td>
                  <td className="text-red-500 font-bold">{job?.deadline}</td>
                  <td>
                    <Link href={`/managejobs/${job?._id}`}>
                      <button className="btn bg-[#033f63] btn-md text-white">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn text-red-500"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                  <td>
                  {
                      job?.status == 'hot' ? <button className='btn text-orange-500'
                      onClick={()=> handleDowngradeJob(job._id)}>
                        <FaArrowDownLong />
                      </button> : <button className='btn text-orange-500'
                    onClick={()=> handleUpgradeJob(job._id)}>
                      <FaArrowUpLong />
                    </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center py-2">
        Current Page: {currentPage} out of {numberOfPages - 1}
      </p>
      <div className="space-x-2 flex justify-center flex-wrap min-w-[425px] mx-auto py-4">
        <button className="btn" onClick={handlePrevPage}>
          <MdOutlineSkipPrevious />
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={page}
            className={
              currentPage === page ? "btn bg-[#033f63] text-white" : "btn"
            }
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="btn">
          <MdOutlineSkipNext />
        </button>
        <select
          className="select select-bordered w-[80px]"
          value={jobsPerPage}
          onChange={handleJobsPerPage}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      </>
        )
      }

      
    </div>
  );
};

export default ManageJobs;
