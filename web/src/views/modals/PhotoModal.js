import React, { useState } from "react";
import Dialog from "../../components/ui/Dialog";
import { PhotoState } from "../../atom/photoState";
import { useRecoilState } from "recoil";
import ImageHandler from "../../handler/ImageHandler";

const PhotoModal = () => {
  const [PhotoModal, setPhotoModal] = useRecoilState(PhotoState);
  const { convertImageURL } = ImageHandler();
   
    const onClose = () => {
        setPhotoModal((prev) => ({ ...prev, isOpen: false }));
    }
  return (
    <Dialog
      isOpen={PhotoModal.isOpen}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-3xl lg:max-h-[500px] sm:rounded-lg`}
      overlayClassName="backdrop-blur"
      closable={true}
    >
      <div className="lg:max-h-[500px]">
        <img
          className="object-cover object-center h-full w-full"
          src={convertImageURL(PhotoModal?.photo)}
          alt="modal_photo"
        />
      </div>
    </Dialog>
  );
};

export default PhotoModal;
