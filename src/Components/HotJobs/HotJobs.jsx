'use client';
import JobCard from "../JobCard/JobCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {useState, useEffect} from 'react';

const HotJobs =  () => {
  const [hotJobs, setHotjobs] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/hotjobs?status=hot")
    .then(res => res.json())
    .then(data => setHotjobs(data))
  }, [])

  return (
    <div className="py-10">
      <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">
        Hot Jobs: {hotJobs.length}
      </h1>
      <p className="text-center text-2xl mb-4">
        Search your favourite jobs from here.
      </p>
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {hotJobs.map((job) => (
          <JobCard job={job} key={job._id}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
