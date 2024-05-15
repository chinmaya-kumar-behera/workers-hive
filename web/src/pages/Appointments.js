import React from "react";
import Navbar from "../views/navbar/Navbar";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";
import AppointmentsUser from "../views/appointment/AppointmentsUser";
import AppointmentsWorker from "../views/appointment/AppointmentsWorker";

const DefaultComponent = () => {
    return <div>Hello this is default component</div>
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
