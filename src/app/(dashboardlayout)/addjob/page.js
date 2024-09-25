
const AddJob = ()=>{
    return (
        <div className='py-5'>
        <h2 className='text-3xl text-center font-bold mb-2 text-[#033f63]'>Add a Job</h2>
        <form className='p-4 bg-base-200'>
        <div className='flex md:flex-row flex-col gap-4'>

        {/* input for company name */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Company Name:</span>
          </label>
          <input type="text" placeholder="Company Name" name='company_name' className="input input-bordered" required />
        </div>
        {/* input for job title */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input type="text" placeholder="Job Title" name='job_title' className="input input-bordered" required />
        </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4'>

        {/* input for location */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Location:</span>
          </label>
          <input type="text" placeholder="Location" name='location' className="input input-bordered" required />
        </div>
        {/* input for experience */}
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Experience:</span>
          </label>
          <input type="text" placeholder="Experience" name='experience' className="input input-bordered" required />
        </div>
        </div>

        </form>
        </div>
    )
}

export default AddJob;