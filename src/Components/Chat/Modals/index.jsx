import React from 'react';
import { useSelector } from 'react-redux';
import { Modal as ModalB } from 'react-bootstrap';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';
import Add from './Add.jsx';
import { modalTypeSelector, isOpenedSelector } from '../../../stateSelectors/modalsSelectors.js';

const componentByType = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = () => {
  const modalType = useSelector(modalTypeSelector);
  const isOpened = useSelector(isOpenedSelector);

  const ModalComponent = componentByType[modalType];
  return (!!ModalComponent && (
    <ModalB show={isOpened}>
      <ModalComponent />
    </ModalB>
  ));
};

export default Modal;
