import React, { useState } from "react";
import Dialog from "../../components/ui/Dialog";
import ImageFill from "../serviceProvider/components/ImageFill";
import ProfileHandler from "../../handler/ProfileHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import toast from "react-hot-toast";

const EditProfilePicModal = ({ isOpen, onClose }) => {
    const { updateProfileDetailHandler } = ProfileHandler();
    const [formData, setFormData] = useState();
    const authData = useRecoilValue(AuthState);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        updateProfileDetailHandler({ id: authData._id, ...formData })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Profile Photo updated !");
              onClose();
            }
          })
          .catch((err) => console.log(err));
    }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-auto"
      contentClassName={`max-w-[300px] w-full bg-white sm:rounded-lg `}
      overlayClassName="backdrop-blur"
    >
      <form action="/stats" enctype="multipart/form-data">
        <div className="py-5 text-center space-y-3">
          <ImageFill setFormData={setFormData} formData={formData} />
          <button
            className="px-10 py-2 text-white bg-blue-500 rounded"
            onClick={submitHandler}
          >
            submit
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditProfilePicModal;
