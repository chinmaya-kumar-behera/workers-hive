import { useNavigate } from "react-router-dom";

const NavigationHandler = () => {
  const navigate = useNavigate();

  const navigateToAdminPanel = () => {
    navigate("/admin");
  };
  
  const navigateToCategoryPage = () => {
    navigate("/category");
  };

    const navigateToSignInPage = () => {
      navigate("/signin");
  };
  
  const navigateToLogInPage = () => {
    navigate("/signin");
  };

  const navigateToServiceProviderPage = () => {
    navigate("/serviceProvider");
  }

   const navigateToHomePage = () => {
     navigate("/");
   };

  return {
    navigateToAdminPanel,
    navigateToCategoryPage,
    navigateToSignInPage,
    navigateToLogInPage,
    navigateToServiceProviderPage,
    navigateToHomePage,
  };
};

export default NavigationHandler;
