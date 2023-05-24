import React from "react";
import Modal from "react-modal";

function ModalChangeNumber({
  isOpen,
  closeModal,
  content,
  customStyles,
  number,
}) {
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        props={number}
      >
        <div className="flex justify-center items-center h-full text-[#d2cdb0] text-4xl font-mono capitalize sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {number}
        </div>
      </Modal>
    </div>
  );
}

export default ModalChangeNumber;
