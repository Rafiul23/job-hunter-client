"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {
  const session = useSession();
  const email = session ? session?.data?.user?.email : "";
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(()=>{
    if(email){
      axiosPublic.get(`/user?email=${email}`)
      .then(res=> {
        setUser(res.data);
        setLoading(false);
    })
    }
  }, [email, axiosPublic])
 

  return {user, loading};
};

export default useUser;
