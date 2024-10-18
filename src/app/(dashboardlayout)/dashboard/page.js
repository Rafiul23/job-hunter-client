"use client";
import Image from 'next/image';
import welcomeImage from '@/assets/welcomeImage.gif';
import useUser from '@/hooks/useUser';



const Dashboard = () => {

    const {user} = useUser();
    const {name} = user;
    
    return (
        <div>
            <Image
        src={welcomeImage}
        className="w-full h-[450px]"
        width={1000}
        height={500}
        alt="welcome"
      />
      <h2 className='text-2xl text-center py-4 text-[#033f63] font-bold'>Back <br/> {name}!</h2>
        </div>
    );
};

export default Dashboard;