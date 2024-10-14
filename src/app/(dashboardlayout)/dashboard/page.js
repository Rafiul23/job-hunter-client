"use client";
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import welcomeImage from '@/assets/welcomeImage.gif';

export const metadata = {
    title: 'Job Hunter | Dashboard',
    description: 'This page is about dashboard'
  }


const Dashboard = () => {

    const session = useSession();
    const userName = session ? session?.data?.user?.name : "";


    return (
        <div>
            <Image
        src={welcomeImage}
        className="w-full h-[450px]"
        width={1000}
        height={500}
        alt="welcome"
      />
      <h2 className='text-2xl text-center py-4 text-[#033f63] font-bold'>Back <br/> {userName}!</h2>
        </div>
    );
};

export default Dashboard;