import React from "react";
import { Modal } from "@mantine/core";
import useModal from "@src/hooks/useModal";

interface GlobalModalProps {
  size?: string;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ size = "auto" }) => {
  const { hideModal, state } = useModal();

  return (
    <Modal
      opened={state.isOpen}
      onClose={() => hideModal()}
      size={size}
      withCloseButton={false}
      {...state.modalProps}
    >
      {React.isValidElement(state.content) ? (
        state.content
      ) : (
        <p>Invalid content provided for the modal.</p>
      )}
    </Modal>
  );
};

export default GlobalModal;
