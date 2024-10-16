"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecruiter, setIsRecriter] = useState(false);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const checkAdmin = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axiosSecure.get(
            `/user?email=${session.user.email}`
          );
          if (res.data?.role === "admin") {
            setIsAdmin(true);
            setLoading(false);
          } else if (res.data?.role === 'recruiter'){
            setIsRecriter(true);
            setLoading(false);
          } else {
            setIsAdmin(false);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    checkAdmin();
  }, [session, status, axiosSecure]);

  return {isAdmin, loading, isRecruiter};
};

export default useAdmin;
