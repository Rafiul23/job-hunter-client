'use client';
import JobCard from "../JobCard/JobCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {useState, useEffect} from 'react';
import JobTab from "../JobTab/JobTab";

const HotJobs =  () => {
  const [hotJobs, setHotjobs] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(()=>{
    fetch("http://localhost:5000/hotjobs?status=hot")
    .then(res => res.json())
    .then(data => setHotjobs(data))
  }, []);

  const onsite = hotJobs.filter(job => job.onsite_or_remote === 'Onsite');
  const remote = hotJobs.filter(job => job.onsite_or_remote === 'Remote');
  const hybrid = hotJobs.filter(job => job.onsite_or_remote === 'Hybrid');
  const fullTime = hotJobs.filter(job => job.job_type === 'Full Time');
  const partTime = hotJobs.filter(job => job.job_type === 'Part Time');
  

  return (
    <div className="py-10">
      <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">
        Hot Jobs: {hotJobs.length}
      </h1>
      <p className="text-center text-2xl mb-4">
        Search your favourite jobs from here.
      </p>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All Jobs</Tab>
            <Tab>On Site</Tab>
            <Tab>Remote</Tab>
            <Tab>Hybrid</Tab>
            <Tab>Full Time</Tab>
            <Tab>Part Time</Tab>
          </TabList>
          <TabPanel>
            <JobTab Jobs={hotJobs}></JobTab>
          </TabPanel>
          <TabPanel>
            <JobTab Jobs={onsite}></JobTab>
          </TabPanel>
          <TabPanel>
            <JobTab Jobs={remote}></JobTab>
          </TabPanel>
          <TabPanel>
            <JobTab Jobs={hybrid}></JobTab>
          </TabPanel>
          <TabPanel>
            <JobTab Jobs={fullTime}></JobTab>
          </TabPanel>
          <TabPanel>
            <JobTab Jobs={partTime}></JobTab>
          </TabPanel>
          
      </Tabs>
      
    </div>
  );
};

export default HotJobs;
