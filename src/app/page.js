export const dynamic = 'force-dynamic';
import Banner from '@/Components/Banner/Banner';
import Category from '@/Components/Category/Category';
import HotJobs from '@/Components/HotJobs/HotJobs';
import Sponsors from '@/Components/Sponsors/Sponsors';
import TrainingOffers from '@/Components/TrainingOffers/TrainingOffers';

const Home = () => {
  return (
    <div>
     <Banner /> 
     <Sponsors />
     <Category />
     <HotJobs></HotJobs>
     <TrainingOffers></TrainingOffers>
    </div>
  );
};

export default Home;