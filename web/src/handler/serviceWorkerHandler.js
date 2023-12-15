import toast from "react-hot-toast";
import { creataServiceWorkerService, getWorkersBySubcategoryIdService } from "../services/serviceWorkerService";

const serviceWorkerHandler = () => {
  const createServiceWorkerHandler = async (data) => {
    const {
     name,
      email,
      mobileNumber,
      category,
      subCategory,
      professionDescription,
      price
    } = data;

    console.log(data);

    try {
      if (
        !name ||
        !email ||
        !category ||
        !subCategory ||
        !professionDescription || 
        !price
      ) {
        toast.error("Please Fill all the fields");
        return;
      }
      if (mobileNumber) {
        if (mobileNumber.length !== 10) {
          toast.error("Mobile number must be 10 digits.");
        }
      }

    } catch(err) {
      console.log(err.message);
    }
    return creataServiceWorkerService(data);
  };

  const getWorkersBySubcategoryIdHandler = async (data) => {
    return await getWorkersBySubcategoryIdService(data);
  }
  return { createServiceWorkerHandler, getWorkersBySubcategoryIdHandler };
};

export default serviceWorkerHandler;
