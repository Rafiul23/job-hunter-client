import Image from "next/image";
import BannerImage from "../../assets/corporate.jpg";
import Banner_2 from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-slate-400">
      <div className="hero-content flex-col gap-6 md:flex-row-reverse">
        <div className="relative my-6">
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
            className="w-full border-4"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-[#033f63]">
            Elevate your career <br/> to the next step with <br/> 
            exciting job offers!
          </h1>
          <p className="py-6 text-2xl text-white">
            Your dream jobs are waiting for you...
          </p>
          <button className="btn bg-[#033F63] text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
