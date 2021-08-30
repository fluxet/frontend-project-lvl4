import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Formik, Field, Form as FormFormik, ErrorMessage,
} from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import './Signup.scss';
import { ContextAuth } from '../context.js';
import routes from '../routes.js';

const Signup = () => {
  const { t } = useTranslation();
  const ctx = useContext(ContextAuth);
  const history = useHistory();
  const location = useLocation();
  const [passValue, setPassValue] = useState(null);

  const signupSchema = yup.object().shape({
    username: yup.string().required().min(3, 'signupComponent.usernamePlaceholder').max(20, 'signupComponent.usernamePlaceholder'),
    password: yup.string().required().min(6, 'signupComponent.passwordPlaceholder'),
    confirmPassword: yup.string().oneOf([passValue], 'signupComponent.confirmPasswordFeedback'),
  });

  const onPasswordChange = (evt) => {
    setPassValue(evt.target.value);
  };

  const renderErrorContent = (msg) => <div className="error-tooltip">{t(msg)}</div>;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={signupSchema}
            onSubmit={(values, handlers) => {
              const message = _.omit(values, 'confirmPassword');
              const signupUser = async () => {
                try {
                  const response = await axios.post(routes.signupPath(), message);
                  const { from } = location.state || { from: { pathname: '/' } };
                  ctx.authorizeUser(response);
                  history.replace(from);
                } catch (e) {
                  const statusCode = +e.message.split(' ').reverse()[0];
                  if (statusCode === 409) {
                    handlers.setErrors({
                      username: ' ',
                      password: ' ',
                      confirmPassword: t('signupComponent.userAlreadyExist'),
                    });
                  }
                }
              };

              signupUser();
            }}
          >
            {(props) => {
              const { errors, touched, isSubmitting } = props;

              return (
                <Form as={FormFormik} className="p-3">
                  <Form.Group>
                    <Form.Label htmlFor="username">{t('signupComponent.username')}</Form.Label>
                    <Form.Control
                      as={Field}
                      placeholder={t('signupComponent.usernamePlaceholder')}
                      name="username"
                      autoComplete="username"
                      id="username"
                      className={errors.username && touched.username && 'field-error'}
                    />
                    <ErrorMessage render={renderErrorContent} name="username" className="error-tooltip" component="div" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="password">{t('password')}</Form.Label>
                    <Form.Control
                      as={Field}
                      placeholder={t('signupComponent.passwordPlaceholder')}
                      name="password"
                      onKeyUp={onPasswordChange}
                      autoComplete="new-password"
                      type="password"
                      id="password"
                      className={errors.password && touched.password && 'field-error'}
                    />
                    <ErrorMessage render={renderErrorContent} name="password" className="error-tooltip" component="div" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="confirmPassword">{t('signupComponent.confirmPassword')}</Form.Label>
                    <Form.Control
                      as={Field}
                      placeholder={t('signupComponent.confirmPasswordFeedback')}
                      name="confirmPassword"
                      autoComplete="new-password"
                      type="password"
                      id="confirmPassword"
                      className={errors.confirmPassword && touched.confirmPassword && 'field-error'}
                    />
                    <ErrorMessage render={renderErrorContent} name="confirmPassword" className="error-tooltip" component="div" />
                  </Form.Group>
                  <Button type="submit" className="w-100" disabled={isSubmitting}>{t('signupComponent.signup')}</Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
