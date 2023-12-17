import React from "react";
import Dialog from "../../components/ui/Dialog";

const EditPersonalDetailModal = ({ isOpen, onClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-2xl sm:rounded-lg max-h-screen overflow-scroll`}
      overlayClassName="backdrop-blur"
    >
      edit personal detail modal
    </Dialog>
  );
};

export default EditPersonalDetailModal;
