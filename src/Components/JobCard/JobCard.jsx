
import Link from "next/link";


const JobCard = ({ job }) => {
 

    const {company_name, job_title, _id, salary_range, job_type, deadline, onsite_or_remote } = job;

  return (
    <div className="card bg-base-100 border-[#033f63] border">
      <div className="card-body">
        <h2 className="card-title text-[#033f63]">Job Title: {job_title}</h2>
        <div className='flex gap-4'>
            <div className='px-2 py-1 bg-gray-200 rounded-md font-semibold text-[#033f63]'>{onsite_or_remote}</div>
            <div className='px-2 py-1 bg-gray-200 rounded-md font-semibold text-[#033f63]'>{job_type}</div>
        </div>
        <p>Company: <span className="font-bold text-[#033f63]">{company_name}</span></p>
        <p>Salary: {salary_range}</p>
        <p className="font-bold text-red-500">Deadline: {deadline}</p>
        <div className="card-actions justify-end">
          <Link href={`/jobs/${_id}`}>
          <button className="text-[#033f63] font-bold">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
