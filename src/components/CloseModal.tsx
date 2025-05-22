import React from "react";
import { useModal } from "..";
import { BsBack } from "react-icons/bs";

const CloseModal: React.FC = () => {
  const { hideModal } = useModal();
  return (
    <div
      className="flex items-center gap-2 border border-gray-400 rounded p-1 cursor-pointer"
      onClick={hideModal}
    >
      <BsBack />
      <small className=" text-gray-600">Close</small>
    </div>
  );
};

export default CloseModal;
