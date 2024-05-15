import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";

const NavigationHandler = () => {
  const authData = useRecoilValue(AuthState);
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
     navigate(`/`);
  };
  const navigateToProfilePage = () => {
     navigate(`/user/${authData?._id}`);
  }
  const navigateToAppointmentsPage = () => {
    navigate(`/appointments`);
  };

  return {
    navigateToAdminPanel,
    navigateToCategoryPage,
    navigateToSignInPage,
    navigateToLogInPage,
    navigateToServiceProviderPage,
    navigateToHomePage,
    navigateToProfilePage,
    navigateToAppointmentsPage,
  };
};

export default NavigationHandler;
