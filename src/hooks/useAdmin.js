"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session, status } = useSession();
 

  useEffect(() => {
    const checkAdmin = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/user?email=${session.user.email}`
          );
          if (res.data?.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    checkAdmin();
  }, [session, status]);

  return {isAdmin, status};
};

export default useAdmin;
