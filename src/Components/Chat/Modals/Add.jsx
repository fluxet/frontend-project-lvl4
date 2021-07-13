import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ContextWs } from '../../../contextWs';
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
              onSubmit={(values, actions) => {
                socket.emit('newChannel', {
                  name: values.name,
                }, (response) => {
                  showModal('closing')();
                  dispatch(setCurrentChannelId({ currentChannelId: response.data.id }));
                });
                // updateChannelsInfo(dispatch)
              }}
            >
              <Form>
                <FormGroup>
                  <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
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
