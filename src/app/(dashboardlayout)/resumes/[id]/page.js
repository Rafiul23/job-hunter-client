"use client";
import useUser from "@/hooks/useUser";
import { useState, useEffect } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useHandleSignOut from "@/hooks/useHandleSignOut";


const ResumesLinkPage = ({ params }) => {
  const { user, loading } = useUser();
  const { email } = user;
  const [applications, setApplications] = useState([]);
  const { loading:isLoading, isRecruiter } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const handleSignOut = useHandleSignOut();

  useEffect(() => {
    if(email){
      axiosSecure.get(`/resumes?email=${email}&id=${params.id}`)
      .then((res) => setApplications(res.data));
    }
  }, [email, params, axiosSecure]);

  if (loading || isLoading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else if(!isRecruiter){
    return handleSignOut();
  } else {
    return (
      <div className="py-4">
        <h1 className="text-3xl text-[#033f63] font-bold text-center my-4">
          {applications.length} applications found
        </h1>

        <div>
          {applications.length === 0 ? (
            <p className="text-3xl text-red-500 font-bold text-center">
              No application received yet!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      Company Name
                      <br />
                      Job Title
                    </th>
                    <th>
                      Name of Applicant
                      <br />Email of Applicant
                    </th>
                    <th>Applied on</th>
                    <th>Job Link</th>
                    <th>Resume Link</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((job, i) => (
                    <tr key={job._id}>
                      <th>{i + 1}</th>
                      <td>
                        {job?.company_name}
                        <br />
                        {job?.job_title}
                      </td>
                      <td>{job?.name_of_applicant}
                        <br/> {job?.userEmail}
                      </td>
                      <td className="text-red-500 font-bold">
                        {job?.apply_date}
                      </td>
                      <td className="underline text-blue-500 font-semibold">
                        <a href={job?.jobLink}>Job Link</a>
                      </td>
                      <td className="underline text-blue-500 font-semibold">
                        <a href={job?.resumeLink} target="_blank">
                          Resume Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ResumesLinkPage;
