import PageContainer from "../components/shared/PageContainer";
import Navbar from "../views/Navbar";
import ServiceDetailsForm from "../views/serviceProvider/ServiceDetailsForm";

const ServiceProvider = () => {
  return (
    <div className="">
      <Navbar />
      <PageContainer className="mt-2">
        <ServiceDetailsForm/>
      </PageContainer>
    </div>
  );
};

export default ServiceProvider;
