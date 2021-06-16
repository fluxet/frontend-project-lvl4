import React, {
  useContext, useRef, useEffect,
} from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import io from 'socket.io-client';
import axios from 'axios';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { setChannels } from '../channelsSlice';
import { Context } from '../../../context';

const Add = (props) => {
  const socket = io();
  const { showModal } = props;

  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const updateChannelsInfo = (response) => {
    console.log('socket response: ', response);
    showModal('closing')();

    const getChannelsInfo = async () => {
      try {
        const channelsInfo = await axios.get('/api/v1/data', options);
        dispatch(setChannels(channelsInfo.data));
      } catch (err) {
        console.log('home get error: ', err);
      }
    };

    getChannelsInfo();
  };

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
                }, updateChannelsInfo);

                console.log('formik actions: ', actions);
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
