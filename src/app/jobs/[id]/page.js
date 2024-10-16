"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import CoverImage from "@/components/CoverImage/CoverImage";

const JobDetailsPage = ({ params }) => {
  const [jobDetails, setJobDetails] = useState([]);
  const session = useSession();
  const userEmail = session ? session?.data?.user?.email : "";
  const [favDisable, setFavDisable] = useState(false);
  const [applyDisable, setApplyDisable] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useUser();
  const { name } = user;

  useEffect(() => {
    axiosPublic
      .get(`/job/${params?.id}`)
      .then((res) => setJobDetails(res.data));
  }, [axiosPublic, params]);

  const jobLink = `https://job-hunter-globe.vercel.app/jobs/${params?.id}`;

  const {
    company_name,
    job_title,
    job_description,
    location,
    experience,
    qualifications,
    salary_range,
    _id,
    deadline,
    category,
    onsite_or_remote,
    job_type,
    employer_email,
    job_post,
  } = jobDetails;

  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  useEffect(() => {
    if (userEmail) {
      axiosSecure
        .get(`/fav-exist?email=${userEmail}&id=${params?.id}`)
        .then((res) => {
          if (res.data.message) {
            setFavDisable(true);
          } else {
            setFavDisable(false);
          }
        });
    }
  }, [session, userEmail, params, axiosSecure]);

  useEffect(() => {
    if (userEmail) {
      axiosSecure
        .get(`/applied-exist?email=${userEmail}&id=${params?.id}`)
        .then((res) => {
          if (res?.data?.message) {
            setApplyDisable(true);
          } else {
            setApplyDisable(false);
          }
        });
    }
  }, [userEmail, params, session, axiosSecure]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmitResume = (e) => {
    e.preventDefault();
    // console.log(resumeLink);
    handleApplyJob();
    closeModal();
  };

  const handleApplyJob = () => {
    if (user?.role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to apply to any job!",
      });
    }

    if (user?.status === "blocked") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You have been blocked and won't be able to apply to any job!",
      });
    }

    if (userEmail === employer_email) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to apply to your own job!",
      });
    }

    const appliedJobData = {
      userEmail,
      name_of_applicant: name,
      employer_email,
      company_name,
      job_title,
      job_id: _id,
      apply_date: currentDate,
      resumeLink,
      jobLink,
    };

    axiosPublic.post("/jobs-apply", appliedJobData).then((res) => {
      if (res.data.insertedId) {
        setApplyDisable(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job Applied Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAddToFav = () => {
    if (user?.role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to add any job to favorite list!",
      });
    }

    if (userEmail === employer_email) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer: "You won't be able to add your job to your favorite list",
      });
    }

    if (user?.status === "blocked") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
        footer:
          "You have been blocked and won't be able to add any job to favorite list!",
      });
    }

    const jobInfo = {
      company_name,
      job_title,
      job_id: _id,
      userEmail,
      jobLink,
      deadline,
    };

    axiosPublic.post("/favourite", jobInfo).then((res) => {
      if (res.data.insertedId) {
        setFavDisable(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added to Favourite list",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="py-10">
      <CoverImage />
      <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center my-4">
        Job Detalis of: {job_title}
      </h1>

      <div className="grid md:grid-cols-4 grid-cols-1 mt-5 gap-6">
        <div className="col-span-3 space-y-2">
          <h2 className="font-bold text-2xl">Company Name: {company_name}</h2>
          <p>
            <span className="font-bold">Job Description:</span>{" "}
            {job_description}
          </p>
          <p>
            <span className="font-bold">Educational Qualification:</span>{" "}
            {qualifications}
          </p>
          <p>
            <span className="font-bold">Experience:</span> {experience}
          </p>
          <p className="font-bold text-red-500">Deadline: {deadline}</p>
          <p>
            Send your resume at{" "}
            <span className="font-bold">{employer_email}</span>
          </p>
          {modalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 relative w-96">
                <h2 className="text-2xl mb-4">Submit Resume</h2>
                <form onSubmit={handleSubmitResume}>
                  <label className="block mb-4 text-lg font-medium">
                    Resume Link:
                    <input
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                </form>
                <button
                  onClick={closeModal}
                  className=" absolute bottom-8 left-32 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="space-y-4  p-4 bg-gray-200 rounded-xl">
            <h4 className="font-bold text-xl">Job Category: {category}</h4>
            <p>
              <span className="font-bold">Location:</span> {location}
            </p>
            <p>
              <span className="font-bold">Salary Range:</span> {salary_range}
            </p>
            <p>
              <span className="font-bold">Job Type:</span> {job_type}
            </p>
            <p>
              <span className="font-bold">Job Nature:</span> {onsite_or_remote}
            </p>
            <p>
              <span className="font-bold">No of Post:</span>{" "}
              {job_post ? job_post : 3}
            </p>
            <button
              onClick={handleAddToFav}
              disabled={favDisable}
              className="btn bg-[#033f63] w-full text-white"
            >
              Add to Favourite
            </button>

            {currentDate > deadlineDate ? (
              <button disabled className="btn bg-red-500 text-white w-full">
                Apply
              </button>
            ) : (
              <button
                disabled={applyDisable}
                onClick={openModal}
                className="btn bg-green-600 text-white w-full"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
