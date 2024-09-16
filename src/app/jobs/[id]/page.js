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
      
      <div className='grid md:grid-cols-4 grid-cols-1 mt-5 gap-6'>
        <div className="col-span-3 space-y-4">
          <h2 className='font-bold text-2xl'>Company Name: {company_name}</h2>
          <p><span className='font-bold'>Job Description:</span> {job_description}</p>
          <p><span className='font-bold'>Educational Qualification:</span> {qualifications}</p>
          <p><span className='font-bold'>Experience:</span> {experience}</p>
          <p className='font-bold text-red-500'>Deadline: {deadline}</p>
          <p>Send your resume at <span className='font-bold'>{employer_email}</span></p>
        </div>
        <div className='col-span-1 space-y-4 p-4 bg-gray-200 rounded-xl'>
          <h4 className='font-bold text-xl'>Job Category: {category}</h4>
          <p><span className='font-bold'>Location:</span> {location}</p>
          <p><span className='font-bold'>Salary Range:</span> {salary_range}</p>
          <p><span className='font-bold'>Job Type:</span> {job_type}</p>
          <p><span className='font-bold'>Job Nature:</span> {onsite_or_remote}</p>
          <button className='btn bg-[#033f63] w-full text-white'>Add to Favourite</button>
        </div>
      </div>
      
    </div>
  );
};

export default JobDetailsPage;
