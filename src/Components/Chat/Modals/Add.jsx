import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import debug from '../../../../lib/logger.js';

import ContextWs from '../../../contextWs';
import { closeModal } from '../../../stateSlices/modalTypeSlice.js';
import { setCurrentChannelId } from '../../../stateSlices/channelsSlice.js';

const log = debug('Add');
log.enabled = true;

const Add = () => {
  const { t } = useTranslation();
  const ctx = useContext(ContextWs);
  log('ctx: ', ctx);
  const socket = ctx.wsClient;
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required().max(20, 'modals.maxNameLength'),
  });

  const renderErrorContent = (msg) => t(msg); //fdsfds

  return (
    <Modal show> 
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={fieldSchema}
        onSubmit={(values) => {
          socket.emit('newChannel', {
            name: values.name,
          }, (response) => {
            dispatch(closeModal());
            dispatch(setCurrentChannelId({ currentChannelId: response.data.id }));
          });
        }}
      >
        <Form>
          <Modal.Body>
            <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
            <ErrorMessage render={renderErrorContent} name="name" component="span" className="error-tooltip" />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit">{t('modals.add.submit')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Add;
