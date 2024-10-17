import Link from "next/link";

const Category = ({category}) => {
    
  return (
    <div>
      <Link
        href={`/jobsByCategory?category=${category?.category}`}
      >
        <div className="border-2 p-2  hover:text-[#033f63] hover:font-semibold rounded-lg">
          {category?.category}
        </div>
      </Link>
    </div>
  );
};

export default Category;
