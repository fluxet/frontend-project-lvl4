/* eslint-disable no-console */
import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ContextAuth, ContextWs } from '../../context';
import channelSelector from '../../stateSelectors/channelSelector.js';

const ChatForm = () => {
  const { t } = useTranslation();
  const channelId = useSelector(channelSelector);
  const ctx = useContext(ContextAuth);
  const { username } = ctx;
  const { wsClient } = useContext(ContextWs);
  const socket = wsClient;

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <div className="mt-auto py-4">
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
          }, () => {});

          actions.resetForm();
        }}
      >
        <Form>
          <InputGroup>
            <FormControl as={Field} innerRef={inputEl} type="text" name="body" aria-label="body" className="form-control" data-testid="new-message" required />
            <Button type="submit">{t('chatForm.submit')}</Button>
          </InputGroup>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatForm;
