import axios from "axios";

export const appointmentBookService = (data) => {
  const formData = new FormData();
  const { description, workerId, userId, images } = data;

  formData.append("description", description);
  formData.append("workerId", workerId);
  formData.append("userId", userId);
  
  console.log(images, images.length, typeof images)

  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append("appointmentImages", images[i]);
    }
  }

  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/bookappointment`,
    formData
  );
};

export const getWorkerAppointmentsService = (data) => {
  return axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/getworkerappointments/${data.userId}`
  );
};

export const getUserAppointmentsService = (data) => {
  return axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/getuserappointments/${data.userId}`
  );
};
