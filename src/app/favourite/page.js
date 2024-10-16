"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import CoverImage from "@/components/CoverImage/CoverImage";

const FavouritePage = () => {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  const session = useSession();
  const userEmail = session ? session?.data?.user?.email : "";
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (userEmail) {
      axiosSecure.get(`/favourite?email=${userEmail}`).then((res) => {
        setFavouriteJobs(res.data);
      });
    }
  }, [axiosSecure, userEmail]);

  const loadFavjobs = (email) => {
    if (email) {
      axiosSecure.get(`/favourite?email=${email}`).then((res) => {
        setFavouriteJobs(res.data);
      });
    }
  };

  const handleDeleteFavJobs = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favourite/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            loadFavjobs(userEmail);
            Swal.fire({
              title: "Deleted!",
              text: "This job has been removed from your favourite list.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="py-10">
      <CoverImage />
      <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center my-4">
        Favourite Jobs: {favouriteJobs.length}
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Deadline</th>
                <th>Job Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {favouriteJobs.map((job, i) => (
                <tr key={job._id}>
                  <th>{i + 1}</th>
                  <td>{job?.company_name}</td>
                  <td>{job?.job_title}</td>
                  <td className="text-red-500 font-bold">{job?.deadline}</td>
                  <td className="underline text-blue-500 font-semibold">
                    <a href={job?.jobLink}>Link</a>
                  </td>
                  <td className="text-red-500 font-bold">
                    <button onClick={() => handleDeleteFavJobs(job._id)}>
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
