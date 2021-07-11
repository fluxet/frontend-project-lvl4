/* eslint-disable no-console */
import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { ContextWs } from '../../contextWs';
import { Context } from '../../context';

const ChatForm = () => {
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const { username } = useContext(Context);
  const { wsClient } = useContext(ContextWs);
  const socket = wsClient;

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  });

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
            console.log('socket emit response: ', response);
          });

          actions.resetForm();
        }}
      >
        <Form noValidate="" className="">
          <div className="input-group">
            <Field innerRef={inputEl} type="text" name="body" aria-label="body" className="form-control" data-testid="new-message" required />
            <div className="input-group-append"><button type="submit" className="btn btn-primary">Отправить</button></div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatForm;
