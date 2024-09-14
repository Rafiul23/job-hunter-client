import Image from "next/image";
import corporateImage from '../../../assets/globalisation-1014524_1280.png';

const JobDetailsPage = async ({ params }) => {

  const res = await fetch(`http://localhost:5000/job/${params.id}`);
  const jobDetails = await res.json();


  const {company_name, job_title, job_description, location, experience, qualifications, salary_range, deadline, category, onsite_or_remote, job_type, employer_email} = jobDetails;

  return (
    <div className="py-10">
        <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
        Job Dtalis of: {job_title}
      </h1>
      
      <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
        <div className="col-span-3">
          <h2 className='font-bold text-2xl'>Company Name: {company_name}</h2>
          <p>Job Description: {job_description}</p>
          <p>Educational Qualification: {qualifications}</p>
          <p>Experience: {experience}</p>
          <p>Deadline: {deadline}</p>
          <p>Send your resume at {employer_email}</p>
        </div>
        <div className='col-span-1'>
          <h4>Job Category: {category}</h4>
          <p>Location: {location}</p>
          <p>Salary Range: {salary_range}</p>
          <p>Job Type: {job_type}</p>
          <p>Job Nature: {onsite_or_remote}</p>
        </div>
      </div>
      
    </div>
  );
};

export default JobDetailsPage;
