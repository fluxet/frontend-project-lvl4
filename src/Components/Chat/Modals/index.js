import React from 'react';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';
import Add from './Add.jsx';

const componentByType = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = ({ type, showModal, id }) => {
  const ModalComponent = componentByType[type];
  const isModalType = Object.keys(componentByType).includes(type);
  return isModalType && <ModalComponent showModal={showModal} id={id} />;
};

export default Modal;
