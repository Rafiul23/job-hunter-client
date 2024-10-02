"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { FaRegTrashCan, FaArrowUpLong, FaArrowDownLong  } from "react-icons/fa6";
import Swal from "sweetalert2";
import Link from "next/link";

const ManageJobs = () => {
  const [totalCount, setTotalCount] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTotalCount();
  }, []);

  useEffect(() => {
    loadJobs(currentPage, jobsPerPage);
  }, [currentPage, jobsPerPage]);

  const loadTotalCount = () => {
    axios.get("http://localhost:5000/jobsCount")
      .then((res) => setTotalCount(res.data))
      .catch((err) => console.log(err));
  };

  const loadJobs = (currentPage, jobsPerPage) => {
    axios.get(
        `http://localhost:5000/jobs/paginated?page=${currentPage}&size=${jobsPerPage}`
      )
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

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
        axios.delete(`http://localhost:5000/jobs/${_id}`).then((res) => {
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
        axios.patch(`http://localhost:5000/jobs/hot/${_id}`).then((res) => {
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
        axios.patch(`http://localhost:5000/jobs/gen/${_id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            loadTotalCount();
            setCurrentPage(0);
            setJobsPerPage(10);
            loadJobs(currentPage, jobsPerPage);
            Swal.fire({
              title: "Upgraded!",
              text: "The job has become a general job.",
              icon: "success",
            });
          }
        });
      }
    });
  }

  if (loading) {
    return <progress className="progress progress-success w-56"></progress>;
  }

  return (
    <div className="py-5">
      <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Manage Jobs {count}
      </h2>

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
    </div>
  );
};

export default ManageJobs;
