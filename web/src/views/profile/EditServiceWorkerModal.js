import React from "react";
import ServiceDetailsForm from "../serviceProvider/ServiceDetailsForm";
import Dialog from "../../components/ui/Dialog";

const EditServiceWorkerModal = ({ isOpen, onClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-6xl sm:rounded-lg max-h-screen overflow-scroll`}
      overlayClassName="backdrop-blur"
    >
      <ServiceDetailsForm />
    </Dialog>
  );
};

export default EditServiceWorkerModal;
