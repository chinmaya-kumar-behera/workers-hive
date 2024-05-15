import { appointmentBookService, getUserAppointmentsService, getWorkerAppointmentsService, } from "../services/appointmentService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserAppointments, WorkerAppointments } from "../atom/appointmentState";
import { AuthState } from "../atom/authState";

const AppointmentHandler = () => {
  const setUserAppointments = useSetRecoilState(UserAppointments);
  const setWorkerAppointments = useSetRecoilState(WorkerAppointments);
  const authData = useRecoilValue(AuthState);

  const appointmentBookHandler = async (data) => {
    return await appointmentBookService(data);
  };

  const getWorkerAppointmentsHandler = async () => {
    await getWorkerAppointmentsService({ userId: authData._id })
      .then((res) => {
        console.log("appointments :", res.data);
        const { totalAppointments, pendingAppointments, resolvedAppointments, cancelledAppointments, } = res.data;
        setWorkerAppointments((prev) => ({
          ...prev,
          appointments: res.data.data,
          totalAppointments, pendingAppointments, resolvedAppointments, cancelledAppointments,
        }));
      })
      .catch((err) => console.log(err));
  };
  
  const getUserAppointmentsHandler = async () => {
    await getUserAppointmentsService({ userId: authData._id })
      .then((res) => {
        console.log("appointments :", res.data);
        setUserAppointments((prev) => ({
          ...prev,
          appointments: res.data.data,
          totalAppointments: res.data.totalAppointments,
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
