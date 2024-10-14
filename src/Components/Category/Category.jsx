import Link from "next/link";
import { getAllCategories } from "../Utilities/getAllCategories";

const Category = async() => {
  
  const categories = await getAllCategories();

  return (
    <div className="py-10">
         <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center mb-8">
            Job Categories: {categories?.length}   
        </h1>
     

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {categories?.map((category) => (
          <Link href={`/jobsByCategory?category=${category?.category}`} key={category?._id}>
          <div
            className="border-2 p-2  hover:text-[#033f63] hover:font-semibold rounded-lg"
            
          >
            {category?.category}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
