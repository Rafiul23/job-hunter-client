"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


const AddJob = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('Accounting and Finance');
  const [nature, setNature] = useState('Onsite');
  const [type, setType] = useState('Full Time');

  const handleSetCategory = e =>{
    setCategory(e.target.value);
  };
  const handleSetNature = e =>{
    setNature(e.target.value);
  };
  const handleSetType = e =>{
    setType(e.target.value);
  };



  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then((res) => setCategories(res.data));
  }, []);

//   console.log(categories);

const handleAddJob = e =>{
    e.preventDefault();
    const form = e.target;

    const company_name = form.company_name.value;
    const job_title = form.job_title.value;
    const job_description = form.job_description.value;
    const location = form.location.value;
    const experience = form.experience.value;
    const qualifications = form.qualifications.value;
    const salary_range = form.salary_range.value;
    const deadline = form.deadline.value;
    const onsite_or_remote = nature;
    const job_type = type;
    const employer_email = form.employer_email.value;
    const job_post = form.job_post.value;

    const newJob = {
        company_name,
        job_title,
        job_description,
        location,
        experience,
        qualifications,
        salary_range,
        deadline,
        category,
        onsite_or_remote,
        job_type,
        employer_email,
        job_post
    };

    axios.post('http://localhost:5000/job', newJob)
    .then(res =>{
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added a new job successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })

}

  return (
    <div className="py-5">
      <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Add a Job
      </h2>
      <form onSubmit={handleAddJob} className="p-4 bg-base-200">
        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for company name */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Company Name:</span>
            </label>
            <input
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
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for location */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Location:</span>
            </label>
            <input
              type="text"
              placeholder="Location"
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
              name="experience"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for qualifications */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Qualifications:</span>
            </label>
            <input
              type="text"
              placeholder="Qualifications"
              name="qualifications"
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
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for deadline */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Deadline:</span>
            </label>
            <input
              type="date"
              placeholder="Deadline"
              name="deadline"
              className="input input-bordered"
              required
            />
          </div>
          {/* input for category */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Category:</span>
            </label>
            <select onChange={handleSetCategory}  value={category} className="select select-bordered w-full max-w-xs">
                <option disabled>Select Category</option>
              {
                categories.map(category =>
                    <option key={category._id} value={category.category}>{category.category}</option>
                )
              }
              
            </select>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for onsite_or_remote */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Job Nature:</span>
            </label>
            <select onChange={handleSetNature} value={nature} className='select select-bordered w-full max-w-xs'>
              <option value='Onsite'>Onsite</option>
              <option value='Remote'>Remote</option>
              <option value='Hybrid'>Hybrid</option>
            </select>
          </div>
          {/* input for job_type */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Job Type:</span>
            </label>
            <select onChange={handleSetType} value={type} className='select select-bordered w-full max-w-xs'>
              <option value='Full Time'>Full Time</option>
              <option value='Part Time'>Part Time</option>
            </select>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 mb-2">
          {/* input for employer_email */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Employer Email:</span>
            </label>
            <input
              type="email"
              placeholder="Employer's Email"
              name="employer_email"
              className="input input-bordered"
              required
            />
          </div>
          {/* input for job_post */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Job Post:</span>
            </label>
            <input
              type="number"
              placeholder="No of Post"
              name="job_post"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* input for job_description  */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Job Description:</span>
          </label>
          <textarea
            cols="30"
            rows="6"
            type="text"
            name='job_description'
            placeholder="Job Description"
            className="textarea"
            required
          ></textarea>
        </div>
        <div className='py-4 text-center'>
            <button className='btn bg-[#033f63] text-white w-1/2'>Add Job</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
