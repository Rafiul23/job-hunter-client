"use client";
import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAdmin = () => {

    const [user, setUser] = useState([]);
    const session = useSession();

    const userEmail = session ? session?.data?.user?.email : "";
    useEffect(() => {
        axios.get(`http://localhost:5000/user?email=${userEmail}`)
          .then((res) => setUser(res.data));
      }, [userEmail]);

    if(user?.role === 'admin'){
        return true;
    }  else {
        return false;
    }
};

export default useAdmin;