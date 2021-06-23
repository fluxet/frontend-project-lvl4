/* eslint-disable no-console */
import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { addMessage } from './messagesSlice';
import { Context } from '../../context';

const ChatForm = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const {
    username, wasChatFormMount, setWasChatFormMount, wsClient,
  } = useContext(Context);
  const socket = wsClient;

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  });

  useEffect(() => {
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
            <Field innerRef={inputEl} type="text" name="body" aria-label="body" className="form-control" data-testid="new-message" required />
            <div className="input-group-append"><button type="submit" className="btn btn-primary">Отправить</button></div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatForm;
