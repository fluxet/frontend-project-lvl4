import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../stateSlices/modalTypeSlice.js';
import { ContextWs } from '../../../context.js';

const Remove = (props) => {
  const { t } = useTranslation();
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { id } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={() => {
          const messageBody = {
            id,
          };
          socket
            .removeChannel(messageBody)
            .then(() => {
              dispatch(closeModal());
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div>{t('modals.remove.warning')}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
              <Button variant="danger" type="submit" disabled={isSubmitting}>{t('modals.remove.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Remove;
