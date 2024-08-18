import Image from "next/image";
import BannerImage from '../../assets/corporate.jpg'

const Banner = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
      <Image src={BannerImage} alt='corporate image' height={250} width={500} className='w-1/2' />
        <div className='w-1/2'> 
          <h1 className="text-5xl font-bold">Exciting Job Offers!</h1>
          <p className="py-6">
           Your dream jobs are waiting for you...
          </p>
          <button className="btn bg-[#033F63] text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
