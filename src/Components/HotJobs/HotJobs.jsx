'use client';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {useState, useEffect} from 'react';
import JobTab from "../JobTab/JobTab";
import useAxiosPublic from './../../hooks/useAxiosPublic';

const HotJobs =  () => {
  const [hotJobs, setHotjobs] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const axiosPublic = useAxiosPublic();

  useEffect(()=>{
    axiosPublic.get("/hotjobs?status=hot")
    .then(res => setHotjobs(res.data))
    .catch(err => console.log(err))
  }, [axiosPublic]);

  const onsite = hotJobs.filter(job => job.onsite_or_remote === 'Onsite');
  const remote = hotJobs.filter(job => job.onsite_or_remote === 'Remote');
  const hybrid = hotJobs.filter(job => job.onsite_or_remote === 'Hybrid');
  const fullTime = hotJobs.filter(job => job.job_type === 'Full Time');
  const partTime = hotJobs.filter(job => job.job_type === 'Part Time');
  

  return (
    <div className="py-10">
      <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#033f63] font-bold text-center my-4">
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
