'use client';
import Image from "next/image";
import BannerImage from "../../assets/corporate.jpg";
import Banner_2 from "../../assets/banner.jpg";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);
  return (
    <div className="hero min-h-screen bg-slate-400">
      <div className="hero-content flex-col gap-6 md:flex-row-reverse">
        <div className="relative my-6" data-aos="fade-up">
          <Image
            src={Banner_2}
            alt="corporate image"
            height={250}
            width={250}
            className="w-1/2 absolute border-4 -bottom-8 lg:-right-8 md:-right-2 right-20 "
          />
          <Image
            src={BannerImage}
            alt="corporate image"
            height={250}
            width={500}
            className="w-full border-4 z-1"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <h1 data-aos="fade-up" className="lg:text-4xl md:text-2xl text-xl font-bold text-[#033f63]">
            Elevate your career <br/> to the next step with <br/> 
            exciting job offers!
          </h1>
          <p data-aos="fade-left" className="py-6 md:text-2xl text-lg text-white">
            Your dream jobs are waiting for you...
          </p>
          <Link href='/signup'>
          <button data-aos="fade-rigth" className="btn bg-[#033F63] text-white">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
