"use client";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import useAdmin from "@/hooks/useAdmin";
import useHandleSignOut from "@/hooks/useHandleSignOut";

export const metadata = {
  title: `Job Hunter | Profile of: ${name}`,
  description: `This page is a profile page of ${name}`
}

const RecruiterProfile = () => {
  const { user, loading } = useUser();
  const { name, email, image, role } = user || {};
  const { loading:isLoading, isRecruiter } = useAdmin();
  const handleSignOut = useHandleSignOut();


  if (loading || isLoading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else if(!isRecruiter){
    return handleSignOut();
  } else{
    return (
      <div className="py-10 bg-[#387780] px-5">
        <div className="flex justify-between">
          <div className="gap-4 text-white">
            <h2 className="text-3xl font-bold">Name: {name}</h2>
            <p className="text-xl py-2">Role: {role}</p>
            <p className="text-xl">Email: {email}</p>
          </div>
          {
            image && <Image
            src={image}
            className="rounded-full"
            height={150}
            width={150}
            alt="recruiter"
          />
          }
        </div>
      </div>
    );
  }
};

export default RecruiterProfile;
