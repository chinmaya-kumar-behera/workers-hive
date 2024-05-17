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
            image={
              "https://t3.ftcdn.net/jpg/00/27/61/68/240_F_27616800_mP42aLqY152iln3kHDTiAvlMrDoYU606.jpg"
            }
            desc="At Workers Hive, our expert plumbers provide comprehensive solutions to keep your home or business running smoothly. We handle leak repairs, drain cleaning, pipe installations, and water heater maintenance. Our services also include kitchen and bathroom remodeling and 24/7 emergency plumbing. Trust Workers Hive for all your plumbing needs with precision and care."
          />
          <CategorySection
            id={"657bdb638dc59a81f1084f2d"}
            heading={"Electronics"}
            rowreverse={true}
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgnzrRyjxYjP8r1gowZFyVKsJ7qz5t5S3QsnofFB35qw&s"
            }
            desc="Workers Hive offers a wide range of electronics services to keep your property powered and connected. Our skilled electricians provide appliance repair, electrical wiring and rewiring, lighting installation, and smart home automation. We also offer CCTV and security system installations and emergency electrical services. We ensure all work meets the highest standards for quality and safety."
          />
          <CategorySection
            id={"657bdcba8dc59a81f1084f30"}
            heading={"Painting"}
            image={
              "https://media.istockphoto.com/id/134248179/photo/construction-working-putting-plaster-on-a-wall.jpg?s=612x612&w=0&k=20&c=O2dRTQiLTt30Yo0H0drST9o47-CAU_stUhrUn-2b6-A="
            }
            desc="Transform your space with Workers Hive’s professional painting services. Our experienced painters handle interior and exterior painting, wallpaper installation and removal, staining and varnishing, and drywall repair. We also offer custom decorative finishes. Using premium materials and techniques, we deliver beautiful results for both residential and commercial projects."
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
