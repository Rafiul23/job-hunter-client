"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateJobPage = ({ params }) => {
  const [job, setJob] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [nature, setNature] = useState('Onsite');
  const [type, setType] = useState('Full Time');

  axios.get(`http://localhost:5000/job/${params?.id}`)
    .then((res) => setJob(res.data));

    const handleSetNewCategory = e =>{
        setNewCategory(e.target.value);
      };
    
    useEffect(() => {
        axios.get("http://localhost:5000/categories")
          .then((res) => setCategories(res.data));
      }, []);

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
            {/* input for experience */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Experience:</span>
            </label>
            <input
              type="text"
              placeholder="Experience"
              defaultValue={experience}
              name="experience"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>
            {/* input for qualifications */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Qualifications:</span>
            </label>
            <input
              type="text"
              placeholder="Qualifications"
              name="qualifications"
              defaultValue={qualifications}
              className="input input-bordered"
              required
            />
          </div>
          {/* input for salary_range */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Salary Range:</span>
            </label>
            <input
              type="text"
              placeholder="Salary Range"
              name="salary_range"
              defaultValue={salary_range}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>
             {/* input for deadline */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Deadline:</span>
            </label>
            <input
              type="date"
              placeholder="Deadline"
              defaultValue={deadline}
              name="deadline"
              className="input input-bordered"
              required
            />
          </div>
          {/* input for category */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Category: <span className='text-red-500'>Please! Select category before update *</span></span>
            </label>
            <select onChange={handleSetNewCategory}  defaultValue={category} value={newCategory} className="select select-bordered w-full max-w-xs">
                <option disabled>Select Category</option>
              {
                categories.map(category =>
                    <option key={category._id} value={category.category}>{category.category}</option>
                )
              }
              
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobPage;
