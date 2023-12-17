import React, { useState } from "react";
import Dialog from "../../components/ui/Dialog";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import ProfileHandler from "../../handler/ProfileHandler";
import { AuthState } from "../../atom/authState";
import NameFill from "../serviceProvider/components/NameFill";
import EmailFill from "../serviceProvider/components/EmailFill";
import GenderFill from "../serviceProvider/components/GenderFill";
import PhoneFill from "../serviceProvider/components/PhoneFill";
import AddressFill from "../serviceProvider/components/AddressFill";

const EditPersonalDetailModal = ({ isOpen, onClose }) => {
  const { updateProfileDetailHandler } = ProfileHandler();
  const [formData, setFormData] = useState({});
  const authData = useRecoilValue(AuthState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProfileDetailHandler({ id: authData._id, ...formData })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Personal Details Updated!");
          onClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-3xl sm:rounded-lg max-h-screen overflow-scroll p-5`}
      overlayClassName="backdrop-blur"
    >
      <form onSubmit={submitHandler}>
        <div className="space-y-2">
          <NameFill handleChange={handleChange} formData={formData} />
          <EmailFill authData={authData} />
        </div>

        <GenderFill handleChange={handleChange} formData={formData} />
        <PhoneFill formData={formData} handleChange={handleChange} />
        <AddressFill handleChange={handleChange} formData={formData} />

        <div className="flex justify-center">
          <button
            className="px-10 py-2 text-white bg-blue-500 rounded"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditPersonalDetailModal;
