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
  const modalType = useSelector((state) => state.modalType.type);
  const isOpened = useSelector((state) => state.modalType.isOpened);

  const ModalComponent = componentByType[modalType];
  return (isOpened
    && (
    <>
      <ModalComponent id={id} />
    </>
    )
  );
};

export default Modal;
