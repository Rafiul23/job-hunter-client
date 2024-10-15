export const dynamic = 'force-dynamic';
import Banner from '@/Components/Banner/Banner';
import CategoryList from '@/Components/CategoryList/CategoryList';
import HotJobs from '@/Components/HotJobs/HotJobs';
import Sponsors from '@/Components/Sponsors/Sponsors';
import TrainingOffers from '@/Components/TrainingOffers/TrainingOffers';

const Home = () => {
  return (
    <div>
     <Banner /> 
     <Sponsors />
     <CategoryList />
     <HotJobs></HotJobs>
     <TrainingOffers></TrainingOffers>
    </div>
  );
};

export default Home;