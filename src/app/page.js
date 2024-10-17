export const dynamic = "force-dynamic";
import Banner from "@/components/Banner/Banner";
import Category from "@/components/Category/Category";
import HotJobs from "@/components/HotJobs/HotJobs";
import Sponsors from "@/components/Sponsors/Sponsors";
import TrainingOffers from "@/components/TrainingOffers/TrainingOffers";

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
