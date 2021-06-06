import React, { useState, useContext, useRef, useEffect } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import io from 'socket.io-client';
import axios from 'axios';
import {setChannels} from "../channelsSlice";
import {setMessages} from "../messagesSlice";
import {useDispatch} from "react-redux";
import {Context} from "../../../context";

const Rename = (props) => {
  const socket = io();
  const { showModal, id } = props;

  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

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
            <Modal.Title>Переименовать канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{name: ''}}
              onSubmit={(values, actions) => {
                socket.emit('renameChannel', {
                  name: values.name,
                  id,
                }, (response) => {
                  console.log('socket response: ', response);
                  showModal('closing')();

                  axios.get('/api/v1/data', options)
                    .then((resp) => {
                      console.log('modalAdd get response: ', resp);
                      dispatch(setChannels(resp.data));
                      dispatch(setMessages(resp.data.messages));
                    })
                    .catch((err) => console.log('home get error: ', err));
                });

                console.log('formik actions: ', actions);
              }}
            >
              <Form>
                <FormGroup>
                  <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
                  <button type="button" className="me-2 btn btn-secondary" onClick={showModal('closing')}>Отменить</button>
                  <button type="submit" className="btn btn-primary">Отправить</button>
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
