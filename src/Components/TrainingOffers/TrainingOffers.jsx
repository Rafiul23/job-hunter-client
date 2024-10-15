'use client';
import SectionTitle from '../SectionTitle/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const TrainingOffers = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false
    });
  }, []);
  return (
    <div className="py-10">
      <SectionTitle title='Training Offers'></SectionTitle>
      
      <p className="text-center text-2xl mb-4">Get trained, get employed.</p>

      <div data-aos='flip-right' className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="card bg-base-100 border border-[#033f63]">
          <div className="card-body">
            <h2 className="card-title text-[#033f63]">
              Course on Web Development
            </h2>
            <p>Details: 6 monthes course on web development is going on.</p>
            <p>Course fee: $100</p>
            <div className="card-actions justify-end">
              <button className="font-bold text-[#033f63]">View More</button>
            </div>
          </div>
        </div>
        <div data-aos='flip-right' className="card bg-base-100 border border-[#033f63]">
          <div className="card-body">
            <h2 className="card-title text-[#033f63]">
              Course on Ethical Hacking
            </h2>
            <p>Details: 6 monthes course on ethical hacking is going on.</p>
            <p>Course fee: $300</p>
            <div className="card-actions justify-end">
              <button className="font-bold text-[#033f63]">View More</button>
            </div>
          </div>
        </div>
        <div data-aos='flip-right' className="card bg-base-100 border border-[#033f63]">
          <div className="card-body">
            <h2 className="card-title text-[#033f63]">
              Course on Graphic Design
            </h2>
            <p>Details: 6 monthes course on graphic design is going on.</p>
            <p>Course fee: $120</p>
            <div className="card-actions justify-end">
              <button className="font-bold text-[#033f63]">View More</button>
            </div>
          </div>
        </div>
        <div data-aos='flip-right' className="card bg-base-100 border border-[#033f63]">
          <div className="card-body">
            <h2 className="card-title text-[#033f63]">
              Course on Game Development
            </h2>
            <p>Details: 1 year course on game development is going on.</p>
            <p>Course fee: $200</p>
            <div className="card-actions justify-end">
              <button className="font-bold text-[#033f63]">View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingOffers;
