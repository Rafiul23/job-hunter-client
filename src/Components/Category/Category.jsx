"use client";

import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const Category = ({category}) => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false
        });
      }, []);
  return (
    <div data-aos='flip-up'>
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
