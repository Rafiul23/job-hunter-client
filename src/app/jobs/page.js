import Image from "next/image";
import corporateImage from "../../assets/globalisation-1014524_1280.png";
import { getJobsByCategory } from "@/Components/Utilities/getJobsByCategory";
import JobCard from "@/Components/JobCard/JobCard";

const Jobs = async({params, searchParams}) => {

  const jobsByCategory = await getJobsByCategory(searchParams?.category);

  return (
    <div className="py-10">
        <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">
        Job Category:{searchParams.category}
      </h1>
      <p className='py-5 text-center text-2xl'><span className='font-bold'>{jobsByCategory?.length}</span> jobs found under <span className='font-bold'>{searchParams.category} </span> category</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4'>
            {
                jobsByCategory.map(job => <JobCard job={job} key={job._id}></JobCard>)
            }
        </div>
    </div>
  );
};

export default Jobs;
