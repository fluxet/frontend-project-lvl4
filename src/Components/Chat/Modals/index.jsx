import React from 'react';
import { useSelector } from 'react-redux';
import { Modal as ModalB } from 'react-bootstrap';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';
import Add from './Add.jsx';

const componentByType = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = ({ id }) => {
  const modalType = useSelector((state) => state.modal.type);
  const isOpened = useSelector((state) => state.modal.isOpened);

  const ModalComponent = componentByType[modalType];
  return (!!ModalComponent && (
    <ModalB show={isOpened}>
      <ModalComponent id={id} />
    </ModalB>
  ));
};

export default Modal;
