import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { ContextWs } from '../../../contextWs';

const Rename = (props) => {
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { showModal, id, updateChannelsInfo } = props;
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={showModal('closing')}>
            <Modal.Title>{i18next.t('modals.rename.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={(values, actions) => {
                socket.emit('renameChannel', {
                  name: values.name,
                  id,
                }, updateChannelsInfo(dispatch));

                console.log('formik actions: ', actions);
              }}
            >
              <Form>
                <FormGroup>
                  <Field innerRef={inputEl} name="name" autoFocus data-testid="rename-channel" className="mb-2 form-control" required />
                  <button type="button" className="me-2 btn btn-secondary" onClick={showModal('closing')}>{i18next.t('modals.cancel')}</button>
                  <button type="submit" className="btn btn-primary">{i18next.t('modals.rename.submit')}</button>
                </FormGroup>
              </Form>
            </Formik>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Rename;
