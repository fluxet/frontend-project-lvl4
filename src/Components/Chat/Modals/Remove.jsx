import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../stateSlices/modalSlice.js';
import { ContextChatApi } from '../../../context.js';
import debug from '../../../../lib/logger.js';
import { modalIdSelector } from '../../../stateSelectors/modalsSelectors.js';

const log = debug('Remove');
log.enabled = true;

const Error = ({ msg }) => <div className="error-tooltip">{msg}</div>;

const Remove = () => {
  const { t } = useTranslation();
  const { chatApi } = useContext(ContextChatApi);
  const id = useSelector(modalIdSelector);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: () => {
      const messageBody = {
        id,
      };
      chatApi
        .removeChannel(messageBody)
        .then(() => {
          dispatch(closeModal());
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    },
  });

  chatApi.onReconnection(() => {
    dispatch(closeModal());
  });

  return (
    <>
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div>{t('modals.remove.warning')}</div>
          {errorMessage && <Error msg={t(errorMessage)} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
          <Button variant="danger" type="submit" disabled={formik.isSubmitting || errorMessage}>{t('modals.remove.submit')}</Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default Remove;
