import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ContextChatApi } from '../../../context.js';
import { closeModal } from '../../../stateSlices/modalSlice.js';
import { setCurrentChannelId } from '../../../stateSlices/channelsSlice.js';
import debug from '../../../../lib/logger.js';

const log = debug('Add');
log.enabled = true;

const Add = () => {
  const { t } = useTranslation();
  const { chatApi } = useContext(ContextChatApi);
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required('modals.requiredField').max(20, 'modals.maxNameLength'),
  });

  const renderErrorContent = (msg) => <div className="error-tooltip">{t(msg)}</div>;

  return (
    <>
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={fieldSchema}
        onSubmit={(values, handlers) => {
          const messageBody = {
            name: values.name,
          };
          chatApi
            .addChannel(messageBody)
            .then((response) => {
              dispatch(closeModal());
              dispatch(setCurrentChannelId({ currentChannelId: response.data.id }));
            })
            .catch((err) => {
              handlers.setErrors({
                name: err.message,
              });
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
              <ErrorMessage render={renderErrorContent} name="name" component="span" className="error-tooltip" />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
              <Button type="submit" disabled={isSubmitting}>{t('modals.add.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Add;
