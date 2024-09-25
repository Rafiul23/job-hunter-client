
const AddJob = ()=>{
    return (
        <div className='py-5'>
        <h2 className='text-3xl text-center font-bold mb-2 text-[#033f63]'>Add a Job</h2>
        <form className='p-4 bg-base-200'>
        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for company name */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Company Name:</span>
          </label>
          <input type="text" placeholder="Company Name" name='company_name' className="input input-bordered" required />
        </div>
        {/* input for job title */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Job Title</span>
          </label>
          <input type="text" placeholder="Job Title" name='job_title' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for location */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Location:</span>
          </label>
          <input type="text" placeholder="Location" name='location' className="input input-bordered" required />
        </div>
        {/* input for experience */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Experience:</span>
          </label>
          <input type="text" placeholder="Experience" name='experience' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for qualifications */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Qualifications:</span>
          </label>
          <input type="text" placeholder="Qualifications" name='qualifications' className="input input-bordered" required />
        </div>
        {/* input for salary_range */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Salary Range:</span>
          </label>
          <input type="text" placeholder="Salary Range" name='salary_range' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for deadline */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Deadline:</span>
          </label>
          <input type="date" placeholder="Deadline" name='deadline' className="input input-bordered" required />
        </div>
        {/* input for category */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Category:</span>
          </label>
          <input type="text" placeholder="Category" name='category' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for onsite_or_remote */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Job Nature:</span>
          </label>
          <input type="text" placeholder="Job Nature" name='onsite_or_remote' className="input input-bordered" required />
        </div>
        {/* input for job_type */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Job Type:</span>
          </label>
          <input type="text" placeholder="Job Type" name='job_type' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4 mb-2'>

        {/* input for employer_email */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Employer Email:</span>
          </label>
          <input type="text" placeholder="Employer's Email" name='employer_email' className="input input-bordered" required />
        </div>
        {/* input for job_post */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text font-bold">Job Post:</span>
          </label>
          <input type="number" placeholder="No of Post" name='job_post' className="input input-bordered" required />
        </div>
        </div>

        </form>
        </div>
    )
}

export default AddJob;