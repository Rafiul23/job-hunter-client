"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import corporateImage from "@/assets/globalisation-1014524_1280.png";

const CoverImage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Image
      data-aos="flip-down"
      src={corporateImage}
      className="w-full h-[250px]"
      width={1200}
      alt="corporate"
    />
  );
};

export default CoverImage;
