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
import { setVisibility } from '../modalTypeSlice';
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
    name: yup.string().required().max(20, t('modals.maxNameLength')),
  });

  return (
    <Modal show>
      <Modal.Header closeButton onClick={() => dispatch(setVisibility(false))}>
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
            dispatch(setVisibility(false));
          });
        }}
      >
        <Form>
          <Modal.Body>
            <Field innerRef={inputEl} name="name" autoFocus data-testid="rename-channel" className="mb-2 form-control" required />
            <ErrorMessage name="name" component="span" className="error-tooltip" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(setVisibility(false))}>{t('modals.cancel')}</Button>
            <Button type="submit">{t('modals.add.submit')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Rename;
