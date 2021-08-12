import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../stateSlices/modalTypeSlice.js';
import ContextWs from '../../../contextWs';

const Rename = (props) => {
  const { t } = useTranslation();
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { id } = props;
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required().max(20, 'modals.maxNameLength'),
  });

  const renderErrorContent = (msg) => t(msg);

  return (
    <>
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={fieldSchema}
        onSubmit={(values) => {
          socket.emit('renameChannel', {
            name: values.name,
            id,
          }, () => {
            dispatch(closeModal());
          });
        }}
      >
        <Form>
          <Modal.Body>
            <Field innerRef={inputEl} name="name" autoFocus data-testid="rename-channel" className="mb-2 form-control" required />
            <ErrorMessage render={renderErrorContent} name="name" component="span" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit">{t('modals.add.submit')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </>
  );
};

export default Rename;
