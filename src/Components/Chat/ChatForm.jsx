import React, {
  useContext, useEffect, useRef,
} from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ContextAuth, ContextChatApi } from '../../context';
import { channelIdSelector } from '../../stateSelectors/channelsSelectors.js';
import routes from '../../routes';
import debug from '../../../lib/logger.js';

const log = debug('ChatForm');
log.enabled = true;

const ChatForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const channelId = useSelector(channelIdSelector);
  const { username } = useContext(ContextAuth);
  const { chatApi } = useContext(ContextChatApi);
  const messageSchema = yup.object().shape({
    body: yup.string().trim().required('chatForm.requiredField'),
  });

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  }, [channelId]);

  const renderErrorContent = (msg) => <div className="error-tooltip">{t(msg)}</div>;

  return (
    <div className="mt-auto py-4">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={messageSchema}
        validateOnBlur={false}
        onSubmit={(values, handlers) => {
          const messageBody = {
            data: {
              attributes: {
                message: values.body,
                username,
                channelId,
              },
            },
          };

          const sendChatMessage = async () => {
            try {
              await chatApi.sendMessage(messageBody);
              handlers.resetForm();
            } catch (e) {
              const statusCode = e?.response?.status;
              if (statusCode === 401) {
                history.push(routes.loginPathName());
              }
              handlers.setErrors({
                body: e.message,
              });
            }
          };

          sendChatMessage();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputGroup>
              <FormControl as={Field} innerRef={inputEl} autoComplete="off" type="text" name="body" aria-label="body" className="form-control" data-testid="new-message" required />
              <Button type="submit" disabled={isSubmitting}>{t('chatForm.submit')}</Button>
            </InputGroup>
            <ErrorMessage render={renderErrorContent} name="body" className="error-tooltip" component="div" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatForm;
