"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import corporateImage from "../../assets/globalisation-1014524_1280.png";
import axios from "axios";

const FavouritePage = () => {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  const session = useSession();
  const userEmail = session ? session?.data?.user?.email : "";

  
    axios.get(`http://localhost:5000/favourite?email=${userEmail}`)
    .then((res) => {
      setFavouriteJobs(res.data);
    });


  return (
    <div className="py-10">
      <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
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
              </tr>
            </thead>
            <tbody>
              {
                favouriteJobs.map((job, i) => <tr key={job._id}>
                    <th>{i + 1}</th>
                    <td>{job?.company_name}</td>
                    <td>{job?.job_title}</td>
                    <td className='text-red-500 font-bold'>{job?.deadline}</td>
                    <td className='underline text-blue-500 font-semibold'><a href={job?.jobLink}>Link</a></td>
                  </tr>)
              }
             
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
