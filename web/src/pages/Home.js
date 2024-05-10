import Categories from "../views/Home/Categories";
import ServicesSlider from "../views/Home/ServicesSlider";
import TrendingServices from "../views/Home/TrendingServices";
import Footer from "../views/Footer";
import Navbar from "../views/navbar/Navbar";
import CategorySection from "../views/Home/CategorySection";

const Home = () => {
 
  return (
    <div className="">
      <Navbar />
      <div className="space-y-4 mt-2">
        <Categories />
       <ServicesSlider />
        <CategorySection id={"657bca1b8dc59a81f1084ee5"} heading={"Plumber"} />
         <CategorySection
          id={"657bdb638dc59a81f1084f2d"}
          heading={"Electrician"}
        /> 
        <CategorySection id={"657bdcba8dc59a81f1084f30"} heading={"Painter"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
