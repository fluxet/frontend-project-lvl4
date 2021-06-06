import React, { useState, useContext, useRef, useEffect } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import io from 'socket.io-client';
import axios from 'axios';
import cn from 'classnames';
import {setChannels} from "../channelsSlice";
import {setMessages} from "../messagesSlice";
import {useDispatch} from "react-redux";
import {Context} from "../../../context";

const Remove = (props) => {
  const socket = io();
  const { showModal, id } = props;

  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={showModal('closing')}>
            <Modal.Title>Удалить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{name: ''}}
              onSubmit={(values, actions) => {
                socket.emit('removeChannel', {
                  id,
                }, (response) => {
                  console.log('socket response: ', response);
                  showModal('closing')();

                  axios.get('/api/v1/data', options)
                    .then((resp) => {
                      console.log('modalRemove get response: ', resp);
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
                  <div>Уверены?</div>
                  <button type="button" onClick={showModal('closing')} className="me-2 btn btn-secondary">Отменить</button>
                  <button type="submit" className="btn btn-danger">Удалить</button>
                </FormGroup>
              </Form>
            </Formik>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Remove;
