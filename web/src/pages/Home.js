import Categories from "../views/Home/Categories";
import ServicesSlider from "../views/Home/ServicesSlider";
import TrendingServices from "../views/Home/TrendingServices";
import Footer from "../views/Footer";
import Navbar from "../views/Navbar";

const Home = () => {
  return (
    <div className="">
      <Navbar/>
      <div className="space-y-4 mt-2">
        <Categories />
        <ServicesSlider />
        {/* <TrendingServices /> */}
        {/* <CategorySection heading={"Plumber"} />
        <CategorySection heading={"Electrician"} />
        <CategorySection heading={"Mechanic"} /> */}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
