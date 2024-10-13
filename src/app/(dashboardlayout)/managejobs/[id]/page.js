"use client";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import useAdmin from "@/hooks/useAdmin";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useHandleSignOut from "@/hooks/useHandleSignOut";


const UpdateJobPage = ({ params }) => {
  const [job, setJob] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('Accounting and Finance');
  const [newNature, setNewNature] = useState('Onsite');
  const [newType, setNewType] = useState('Full Time');
  const { isAdmin, loading } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const handleSignOut = useHandleSignOut();


 useEffect(()=>{
  axiosPublic.get(`/job/${params?.id}`)
    .then((res) => setJob(res.data))
    .catch(err =>{
        console.log(err);
    })
 }, [params, axiosPublic])

    const handleSetNewCategory = e =>{
        setNewCategory(e.target.value);
      };
    const handleSetNewNature = e =>{
        setNewNature(e.target.value);
      };
    const handleSetNewType = e =>{
        setNewType(e.target.value);
      };
    
      
    
    useEffect(() => {
      axiosPublic.get("/categories")
          .then((res) => setCategories(res.data));
      }, [axiosPublic]);

  const {
    _id,
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
    job_post,
  } = job;

  const handleUpdateJob = e =>{
    e.preventDefault();
    const form = e.target;

    const company_name = form.company_name.value.trim();
    const job_title = form.job_title.value.trim();
    const job_description = form.job_description.value.trim();
    const location = form.location.value.trim();
    const experience = form.experience.value.trim();
    const qualifications = form.qualifications.value.trim();
    const salary_range = form.salary_range.value.trim();
    const deadline = form.deadline.value.trim();
    const onsite_or_remote = newNature;
    const job_type = newType;
    const employer_email = form.employer_email.value.trim();
    const job_post = Number(form.job_post.value);
  

  const updatedJobData = {
    company_name,
    job_title,
    job_description,
    location,
    experience,
    qualifications,
    salary_range,
    deadline,
    category: newCategory,
    onsite_or_remote,
    job_type,
    employer_email,
    job_post
};

// console.log(updatedJobData);

axiosSecure.put(`/jobs/${_id}`, updatedJobData)
.then(res =>{
    if(res.data.modifiedCount > 0){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your job has been updated",
            showConfirmButton: false,
            timer: 1500
          });
    };
})
.catch(err =>{
    console.log(err);
})

};

if(loading) {
  return <progress className="progress progress-success w-56"></progress>;
} 
if(!isAdmin) {
  return handleSignOut();
}

  return (
    <div className="py-8">
      <h2 className="text-3xl text-center font-bold mb-4 text-[#033f63]">
        Update {job_title} Job
      </h2>
      <p className='py-4 text-center text-red-500 font-bold'>Caution: When updating a job data, every time you need to select the category, job type and job nature. Otherwise, your job category, job nature and job type may be changed by default!!!</p>

      <form onSubmit={handleUpdateJob} className="p-4 bg-base-200">
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
              <span className="label-text font-bold">Category:</span>
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

        <div className='flex md:flex-row flex-col gap-4 mb-2'>
               {/* input for onsite_or_remote */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Job Nature:</span>
            </label>
            <select onChange={handleSetNewNature} defaultValue={onsite_or_remote} value={newNature} className='select select-bordered w-full max-w-xs'>
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
            <select onChange={handleSetNewType} defaultValue={job_type} value={newType} className='select select-bordered w-full max-w-xs'>
              <option value='Full Time'>Full Time</option>
              <option value='Part Time'>Part Time</option>
            </select>
          </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>
               {/* input for employer_email */}
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text font-bold">Employer Email:</span>
            </label>
            <input
              type="email"
              placeholder="Employer's Email"
              name="employer_email"
              defaultValue={employer_email}
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
              defaultValue={job_post}
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
            defaultValue={job_description}
            placeholder="Job Description"
            className="textarea"
            required
          ></textarea>
        </div>
        <div className='py-4 text-center'>
            <button className='btn bg-[#033f63] text-white w-1/2'>Update Job</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobPage;
