import { appointmentBookService, getUserAppointmentsService, getWorkerAppointmentsService, } from "../services/appointmentService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserAppointments } from "../atom/appointmentState";
import { AuthState } from "../atom/authState";

const AppointmentHandler = () => {
  const setUserAppointments = useSetRecoilState(UserAppointments);
  const authData = useRecoilValue(AuthState);

  const appointmentBookHandler = async (data) => {
    return await appointmentBookService(data);
  };

  const getWorkerAppointmentsHandler = async (data) => {
    return await getWorkerAppointmentsService(data);
  };
  
  const getUserAppointmentsHandler = async () => {
    await getUserAppointmentsService({ userId: authData._id })
      .then((res) => {
        console.log("appointments :", res.data.data);
        setUserAppointments((prev) => ({
          ...prev,
          appointments: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  };

  return {
    appointmentBookHandler,
    getWorkerAppointmentsHandler,
    getUserAppointmentsHandler,
  };
};

export default AppointmentHandler;
