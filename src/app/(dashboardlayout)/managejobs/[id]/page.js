"use client";
import { useState } from "react";
import axios from "axios";

const UpdateJobPage = ({ params }) => {
  const [job, setJob] = useState([]);

  axios
    .get(`http://localhost:5000/job/${params?.id}`)
    .then((res) => setJob(res.data));

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
    job_post,
  } = job;

  return (
    <div className="py-5">
      <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Update {job_title} Job
      </h2>

      <form className="p-4 bg-base-200">
        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for company name */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Company Name:</span>
            </label>
            <input
              defaultValue={company_name}
              type="text"
              placeholder="Company Name"
              name="company_name"
              className="input input-bordered"
              required
            />
           
          </div>
           {/* input for job title */}
           <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Job Title</span>
            </label>
            <input
              type="text"
              placeholder="Job Title"
              name="job_title"
              defaultValue={job_title}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>
            {/* input for location */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Location:</span>
            </label>
            <input
              type="text"
              placeholder="Location"
              defaultValue={location}
              name="location"
              className="input input-bordered"
              required
            />
          </div>

        </div>
      </form>
    </div>
  );
};

export default UpdateJobPage;
