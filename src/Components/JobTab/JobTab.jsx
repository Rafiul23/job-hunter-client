import JobCard from "../JobCard/JobCard";


const JobTab = ({Jobs}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {Jobs.map((job) => (
          <JobCard job={job} key={job._id}></JobCard>
        ))}
      </div>
    );
};

export default JobTab;