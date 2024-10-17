import Category from "../Category/Category";
import { getAllCategories } from "../Utilities/getAllCategories";

const CategoryList = async() => {
  
  const categories = await getAllCategories();

  return (
    <div className="py-10">
         <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center mb-8">
            Job Categories: {categories?.length}   
        </h1>
     

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {categories?.map((category) => (
          <Category key={category._id}
          category={category}
          ></Category>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
