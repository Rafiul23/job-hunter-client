import axios from "axios";
import { useEffect } from "react";
import { signOut } from "next-auth/react";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {

    useEffect(()=>{
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, err =>{
            if(err.response.status === 401 || err.response.status === 403){
                console.log(err.response);
                // signOut()
                // .then(res => console.log('Unauthorized access',res))
                // .catch(err => console.log(err))
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;