export const dynamic = "force-dynamic";
import Banner from "@/components/Banner/Banner";
import CategoryList from "@/components/CategoryList/CategoryList";
import HotJobs from "@/components/HotJobs/HotJobs";
import Sponsors from "@/components/Sponsors/Sponsors";
import TrainingOffers from "@/components/TrainingOffers/TrainingOffers";

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
