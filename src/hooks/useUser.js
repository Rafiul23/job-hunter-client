"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUser = () => {
  const session = useSession();
  const email = session ? session?.data?.user?.email : "";
  const [user, setUser] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:5000/user?email=${email}`)
    .then(res=> setUser(res.data))
  }, [email])
 

  return user;
};

export default useUser;
