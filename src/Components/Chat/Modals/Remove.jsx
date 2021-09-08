import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
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
            .catch((err) => {
              setErrorMessage(err.message);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div>{t('modals.remove.warning')}</div>
              {errorMessage && <Error msg={t(errorMessage)} />}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
              <Button variant="danger" type="submit" disabled={isSubmitting || errorMessage}>{t('modals.remove.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Remove;
