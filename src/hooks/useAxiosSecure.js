import axios from "axios";
import { useEffect } from "react";
import useHandleSignOut from "./useHandleSignOut";

const axiosSecure = axios.create({
  baseURL: "https://job-hunter-server-two.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const handleSignOut = useHandleSignOut();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err.response);
          handleSignOut();
        }
      }
    );
  }, [handleSignOut]);

  return axiosSecure;
};

export default useAxiosSecure;
