import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../stateSlices/modalSlice.js';
import { ContextChatApi } from '../../../context.js';
import debug from '../../../../lib/logger.js';

const log = debug('Remove');
log.enabled = true;

const Remove = (props) => {
  const { t } = useTranslation();
  const { chatApi } = useContext(ContextChatApi);
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
          chatApi
            .removeChannel(messageBody)
            .then(() => {
              dispatch(closeModal());
            })
            .catch(log);
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
