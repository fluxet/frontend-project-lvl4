import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ContextWs } from '../../../contextWs';
import { setType } from '../modalTypeSlice';
import { setCurrentChannelId } from '../channelsSlice';

const Add = (props) => {
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { showModal } = props;
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required().max(20, i18next.t('modals.maxNameLength')),
  });

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={showModal('closing')}>
            <Modal.Title>{i18next.t('modals.add.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ name: '' }}
              validationSchema={fieldSchema}
              onSubmit={(values, actions) => {
                socket.emit('newChannel', {
                  name: values.name,
                }, (response) => {
                  dispatch(setType('closing'));
                  dispatch(setCurrentChannelId({ currentChannelId: response.data.id }));
                });
                // updateChannelsInfo(dispatch)
              }}
            >
              <Form>
                <FormGroup>
                  <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
                  <ErrorMessage name="name" component="span" className="error-tooltip"></ErrorMessage>
                  <button type="button" onClick={showModal('closing')} className="me-2 btn btn-secondary">{i18next.t('modals.cancel')}</button>
                  <button type="submit" className="btn btn-primary">{i18next.t('modals.add.submit')}</button>
                </FormGroup>
              </Form>
            </Formik>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Add;
