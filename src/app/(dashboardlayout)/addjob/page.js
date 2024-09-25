
const AddJob = ()=>{
    return (
        <div className='py-5'>
        <h2 className='text-3xl text-center font-bold mb-2 text-[#033f63]'>Add a Job</h2>
        <form className='p-4 bg-base-200'>
        <div className='flex md:flex-row flex-col gap-4'>
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Company Name:</span>
          </label>
          <input type="text" placeholder="Company Name" name='company_name' className="input input-bordered" required />
        </div>
        <div className="form-control md:w-1/2 w-full">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input type="text" placeholder="Job Title" name='job_title' className="input input-bordered" required />
        </div>
        </div>
        </form>
        </div>
    )
}

export default AddJob;