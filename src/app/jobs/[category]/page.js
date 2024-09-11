import { getJobsByCategory } from "@/Components/Utilities/getJobsByCategory";
import Image from "next/image";
import corporateImage from '../../../assets/globalisation-1014524_1280.png';

const JobsByCategory = async ({ params, searchParams }) => {

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
      <p className='py-5 text-center text-2xl'>{jobsByCategory?.length} jobs found under {searchParams.category} category</p>
    </div>
  );
};

export default JobsByCategory;
