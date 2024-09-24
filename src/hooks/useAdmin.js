"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useUser from '@/hooks/useUser';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useUser();

  if(user?.role === 'admin'){
    setIsAdmin(true);
  } else {
    setIsAdmin(false);
  }

 

  return isAdmin;
};

export default useAdmin;
