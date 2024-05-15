import Categories from "../views/Home/Categories";
import ServicesSlider from "../views/Home/ServicesSlider";
import TrendingServices from "../views/Home/TrendingServices";
import Footer from "../views/footer/Footer";
import Navbar from "../views/navbar/Navbar";
import CategorySection from "../views/Home/CategorySection";
import PageContainer from "../components/shared/PageContainer";

const Home = () => {
 
  return (
    <div className="">
      <Navbar />
      <div className="space-y-4 mt-2">
        <Categories />
        <ServicesSlider />

        <section className="p-0 sm:p-1 md:p-3 lg:p-5 space-y-4 lg:space-y-5">
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold py-2 text-center lg:text-left">
            <h3>Trending services</h3>
          </div>

          <CategorySection
            id={"657bca1b8dc59a81f1084ee5"}
            heading={"Plumbing"}
          />
          <CategorySection
            id={"657bdb638dc59a81f1084f2d"}
            heading={"Electronics"}
            rowreverse={true}
          />
          <CategorySection
            id={"657bdcba8dc59a81f1084f30"}
            heading={"Painting"}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
