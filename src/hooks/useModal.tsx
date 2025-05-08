import { useAppDispatch, useAppSelector } from "@src/hooks/redux_hook";

import { openModal, closeModal } from "@src/slice/modal";
import { ReactNode } from "react";

type ModalProps = {
  size?: string | number;
  withCloseButton?: boolean;
  [key: string]: any;
};

const useModal = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.modal);

  const showModal = (content: ReactNode, modalProps: ModalProps) => {
    dispatch(openModal({ content, modalProps }));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return { showModal, hideModal, state };
};

export default useModal;
