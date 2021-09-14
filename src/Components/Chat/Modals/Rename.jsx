import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import {
  Modal, Button, Form, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../stateSlices/modalSlice.js';
import { ContextChatApi } from '../../../context.js';
import debug from '../../../../lib/logger.js';
import { modalIdSelector } from '../../../stateSelectors/modalsSelectors.js';

const log = debug('Rename');
log.enabled = true;

const Rename = () => {
  const { t } = useTranslation();
  const { chatApi } = useContext(ContextChatApi);
  const id = useSelector(modalIdSelector);
  const dispatch = useDispatch();
  const [isConnectionError, setIsConnectionError] = useState(false);

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required('modals.requiredField').max(20, 'modals.maxNameLength'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: fieldSchema,
    onSubmit: (values, handlers) => {
      const messageBody = {
        name: values.name,
        id,
      };
      chatApi
        .renameChannel(messageBody)
        .then(() => {
          dispatch(closeModal());
        })
        .catch((err) => {
          const statusCode = err.response?.status;
          if (statusCode === 408) {
            setIsConnectionError(true);
          }
          handlers.setErrors({
            name: err.message,
          });
        });
    },
  });

  chatApi.onReconnection(() => {
    if (isConnectionError) {
      dispatch(closeModal());
      setIsConnectionError(false);
    }
  });

  return (
    <>
      <Modal.Header closeButton onClick={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormControl
            ref={inputEl}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            autoFocus
            data-testid="rename-channel"
            className="mb-2 form-control"
            required
          />
          {formik.errors.name && <div className="error-tooltip">{t(formik.errors.name)}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
          <Button type="submit" disabled={formik.isSubmitting}>{t('modals.add.submit')}</Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default Rename;
