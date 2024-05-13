import axios from "axios";

export const initiateTransactionService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/initiateTransaction`,data);
};

export const confirmTransactionService = (transactionId, status) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/confirmTransaction`,
    { transactionId, status }
  );
};
;