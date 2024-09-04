'use client';

import { useEffect, useState } from "react";

const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch('categories.json')
        .then(res => res.json())
        .then(data => setCategories(data))
    }, [])

    return (
        <div className="py-10">
             <h1 className="text-5xl text-[#033f63] font-bold text-center mb-8">Job Categories: {categories.length}</h1>

             <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    categories.map(category => <div className='border-2 p-2  hover:text-[#033f63] hover:font-semibold rounded-lg' key={category?._id}>{category?.category}</div>)
                }
                
             </div>
        </div>
    );
};

export default Category;