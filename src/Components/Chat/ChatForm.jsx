/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formik, { Formik, Field, Form } from 'formik';
import io from 'socket.io-client';
import { addMessage } from './messagesSlice';
import { Context } from '../../context';

const ChatForm = () => {
  const socket = io();
  const dispatch = useDispatch();
  const channelId = useSelector(state => state.channels.value.currentChannelId);
  const { username, wasChatFormMount, setWasChatFormMount } = useContext(Context);

  useEffect(() => {
    console.log('********wasChatFormMount: ', wasChatFormMount);
    if (wasChatFormMount) { return; }

    socket.on('newMessage', (message) => {
      dispatch((addMessage(message)));
    });
    setWasChatFormMount(true);
  }, []);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={({ body }, actions) => {
          socket.emit('newMessage', {
            data: {
              attributes: {
                message: body,
                username,
                channelId,
              },
            },
          }, (response) => {
            console.log('socket response: ', response);
          });

          actions.resetForm();
        }}
      >
        <Form noValidate="" className="">
          <div className="input-group">
            <Field type="text" name="body" aria-label="body" className="form-control" />
            <div className="input-group-append"><button type="submit" className="btn btn-primary">Отправить</button></div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatForm;
