"use client";
import { useState } from "react";

const UpdateJobPage = ({params})=>{

    const [job, setJob] = useState([]);  
    
    axios.get(`http://localhost:5000/job/${params?.id}`)
    .then(res => setJob(res.data))

    

    return (
        <div className='py-5'>
            <h2 className="text-3xl text-center font-bold mb-2 text-[#033f63]">
        Update Job 
            </h2>
        </div>
    );
};

export default UpdateJobPage