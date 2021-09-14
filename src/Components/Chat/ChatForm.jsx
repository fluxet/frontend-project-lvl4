import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  InputGroup, Form, Button, FormControl,
} from 'react-bootstrap';
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
  const [isConnectionError, setIsConnectionError] = useState(false);

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: messageSchema,
    validateOnBlur: false,
    onSubmit: (values, handlers) => {
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
          const statusCode = e.response?.status;
          if (statusCode === 401) {
            history.push(routes.loginPathName());
          }
          if (statusCode === 408) {
            setIsConnectionError(true);
          }
          handlers.setErrors({
            body: e.message,
          });
        }
      };

      sendChatMessage();
    },
  });

  chatApi.onReconnection(() => {
    if (isConnectionError) {
      formik.resetForm();
      setIsConnectionError(false);
    }
  });

  return (
    <div className="mt-auto py-4">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <FormControl
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputEl}
            autoComplete="off"
            type="text"
            aria-label="body"
            className="form-control"
            data-testid="new-message"
            required
          />
          <Button type="submit" disabled={formik.isSubmitting}>{t('chatForm.submit')}</Button>
        </InputGroup>
        {formik.errors.body && <div className="error-tooltip">{t(formik.errors.body)}</div>}
      </Form>
    </div>
  );
};

export default ChatForm;
