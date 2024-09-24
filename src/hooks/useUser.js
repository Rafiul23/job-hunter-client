"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUser = () => {
  const session = useSession();
  const email = session ? session?.data?.user?.email : "";
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(`http://localhost:5000/user?email=${email}`)
    .then(res=> {
        setUser(res.data);
        setLoading(false);
    })
  }, [email])
 

  return {user, loading};
};

export default useUser;
