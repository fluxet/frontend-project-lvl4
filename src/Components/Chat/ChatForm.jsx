/* eslint-disable no-console */
import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ContextAuth, ContextWs } from '../../context';
import channelSelector from '../../stateSelectors/channelSelector.js';
import routes from '../../routes';

const ChatForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
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
          const messageBody = {
            data: {
              attributes: {
                message: body,
                username,
                channelId,
              },
            },
          };

          const sendChatMessage = async () => {
            try {
              await socket.sendMessage(messageBody);
            } catch (e) {
              const statusCode = e.response.status;
              if (statusCode === 401) {
                history.push(routes.loginPathName());
              }
              console.error(e);
            }
          };

          sendChatMessage();
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputGroup>
              <FormControl as={Field} innerRef={inputEl} autoComplete="off" type="text" name="body" aria-label="body" className="form-control" data-testid="new-message" required />
              <Button type="submit" disabled={isSubmitting}>{t('chatForm.submit')}</Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatForm;
