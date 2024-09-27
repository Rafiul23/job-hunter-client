"use client";
import Image from "next/image";
import corporateImage from "../../../assets/globalisation-1014524_1280.png";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


const JobDetailsPage = ({ params }) => {
  
  const [jobDetails, setJobDetails] = useState([]);
  const session = useSession();
  const userEmail = session ? session?.data?.user?.email : "";
  const [disable, setDisable] = useState(false);

  
    axios.get(`http://localhost:5000/job/${params?.id}`)
    .then((res) => setJobDetails(res.data));

   const jobLink = `http://localhost:3000/jobs/${params?.id}`;
   
  // const res = await fetch(`http://localhost:5000/job/${params.id}`);
  // const jobDetails = await res.json();

  const {
    company_name,
    job_title,
    job_description,
    location,
    experience,
    qualifications,
    salary_range,
    _id,
    deadline,
    category,
    onsite_or_remote,
    job_type,
    employer_email,
    job_post
  } = jobDetails;

  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  axios.get(`http://localhost:5000/fav-exist?email=${userEmail}&id=${params?.id}`)
  .then(res => {
    if(res.data.message){
      setDisable(true);
    } else {
      setDisable(false);
    }
  })

  const handleApplyJob = ()=>{
    
     if(userEmail === employer_email){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to apply to your own job!"
      });
    };
  }



  const handleAddToFav = () => {

    if(userEmail === employer_email){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to add your job to your favourite list"
      });
    };

    const jobInfo = {
      company_name,
      job_title,
      job_id: _id,
      userEmail,
      jobLink,
      deadline
    };

    axios.post('http://localhost:5000/favourite', jobInfo)
    .then(res =>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Favourite list",
          showConfirmButton: false,
          timer: 1500
        });
      } 
    })
  };

  return (
    <div className="py-10">
      <Image
        src={corporateImage}
        className="w-full h-[250px]"
        width={1200}
        alt="corporate"
      />
      <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
        Job Dtalis of: {job_title}
      </h1>

      <div className="grid md:grid-cols-4 grid-cols-1 mt-5 gap-6">
        <div className="col-span-3 space-y-2">
          <h2 className="font-bold text-2xl">Company Name: {company_name}</h2>
          <p>
            <span className="font-bold">Job Description:</span>{" "}
            {job_description}
          </p>
          <p>
            <span className="font-bold">Educational Qualification:</span>{" "}
            {qualifications}
          </p>
          <p>
            <span className="font-bold">Experience:</span> {experience}
          </p>
          <p className="font-bold text-red-500">Deadline: {deadline}</p>
          <p>
            Send your resume at <span className="font-bold">{employer_email}</span>
          </p>
        </div>
        
        <div className="col-span-1">
          <div className='space-y-4  p-4 bg-gray-200 rounded-xl'>
          <h4 className="font-bold text-xl">Job Category: {category}</h4>
          <p>
            <span className="font-bold">Location:</span> {location}
          </p>
          <p>
            <span className="font-bold">Salary Range:</span> {salary_range}
          </p>
          <p>
            <span className="font-bold">Job Type:</span> {job_type}
          </p>
          <p>
            <span className="font-bold">Job Nature:</span> {onsite_or_remote}
          </p>
          <p><span className='font-bold'>No of Post:</span> {job_post ? job_post : 3}</p>
          <button onClick={handleAddToFav} disabled={disable} className="btn bg-[#033f63] w-full text-white">
            Add to Favourite
          </button>
          
          {
            currentDate > deadlineDate ? <button disabled className='btn bg-green-600 text-white w-full'>Apply</button> : <button onClick={handleApplyJob} className='btn bg-green-600 text-white w-full'>Apply</button>
          }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
