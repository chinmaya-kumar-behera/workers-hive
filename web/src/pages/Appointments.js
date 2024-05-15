import React from "react";
import Navbar from "../views/navbar/Navbar";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";
import AppointmentsUser from "../views/appointment/AppointmentsUser";
import AppointmentsWorker from "../views/appointment/AppointmentsWorker";
import NavigationHandler from "../handler/NavigationHandler";

const DefaultComponent = () => {
  const { navigateToSignInPage } = NavigationHandler();
    return (
      <div className="flex items-center justify-center py-20">
        <div className="p-5 text-center space-y-3 bg-white rounded-lg">
          <p className="text-gray-600">
            You are not allowed to access this page. Please login first to
            access this feature.
          </p>
          <button
            onClick={navigateToSignInPage}
            className="px-10 py-3 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300 rounded-lg"
          >
            Got to Login page
          </button>
        </div>
      </div>
    );
}


const Appointments = () => {
  const userData = useRecoilValue(AuthState);
    
const renderComponents = (role) => {
  switch (role) {
    case "user":
      return <AppointmentsUser />;
    case "worker":
      return <AppointmentsWorker/>;
    default:
      return <DefaultComponent />;
  }
};

  return (
    <React.Fragment>
      <Navbar />
      {renderComponents(userData.role)}
    </React.Fragment>
  );
};

export default Appointments;
