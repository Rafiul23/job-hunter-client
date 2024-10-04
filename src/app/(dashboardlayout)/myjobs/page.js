'use client';
import {useState, useEffect} from 'react';
import useUser from '@hooks/useUser';
import axios from 'axios';

const MyJobsPage = () => {
    const [myJobs, setMyJobs] = useState([]);
    const {user, loading} = useUser();
    const {email} = user;

    useEffect(()=>{
        axios.get(`http://localhost:5000/my-jobs?email=${email}`)
        .then(res => setMyJobs(res.data))
    }, [user, email])
    
    if(loading){
       return <progress className="progress progress-success w-56"></progress>;
    } else {
        return (
            <div className='py-4'>
                <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
                    My Jobs: {myJobs.length}
                 </h1>
            </div>
        );
    }
};

export default MyJobsPage;