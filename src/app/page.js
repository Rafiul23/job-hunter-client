import Banner from '@/Components/Banner/Banner';
import Category from '@/Components/Category/Category';
import HotJobs from '@/Components/HotJobs/HotJobs';
import Sponsors from '@/Components/Sponsors/Sponsors';

const Home = () => {
  return (
    <div>
     <Banner /> 
     <Sponsors />
     <Category />
     <HotJobs></HotJobs>
    </div>
  );
};

export default Home;