import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
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

  const inputEl = useRef('');
  useEffect(() => {
    inputEl.current.focus();
  }, [channelId]);

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
              await chatApi.sendMessage(messageBody);
            } catch (e) {
              const statusCode = e.response.status;
              if (statusCode === 401) {
                history.push(routes.loginPathName());
              }
              log(e);
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
