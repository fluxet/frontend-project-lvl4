import React from 'react';
import { useSelector } from 'react-redux';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';
import Add from './Add.jsx';

const componentByType = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = ({ id }) => {
  const modalType = useSelector((state) => state.modalType.value);

  const ModalComponent = componentByType[modalType];
  const isModalType = Object.keys(componentByType).includes(modalType);
  return isModalType
    && <ModalComponent id={id} />;
};

export default Modal;
