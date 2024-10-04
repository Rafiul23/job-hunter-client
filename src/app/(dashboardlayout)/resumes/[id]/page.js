'use client';
import useUser from "@/hooks/useUser";
import { useState, useEffect } from "react";

const ResumesLinkPage = ({params}) => {
    const { user, loading } = useUser();
    const { email } = user;
    const [applications, setApplications] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/resumes?email=${email}&id=${params.id}`).then(res => setApplications(res.data))
    }, [email, params])

    if(loading){
        return <progress className="progress progress-success w-56"></progress>;
    } else {

        return (
            <div>
                
            </div>
        );
    }
};

export default ResumesLinkPage;