import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import _ from 'lodash';

import './Signup.scss';

const Signup = () => {
  const history = useHistory();
  const location = useLocation();
  const [passValue, setPassValue] = useState(null);

  const signupSchema = yup.object().shape({
    username: yup.string().required().min(3, i18next.t('signupComponent.usernamePlaceholder')).max(20, i18next.t('signupComponent.usernamePlaceholder')),
    password: yup.string().required().min(6, i18next.t('signupComponent.passwordPlaceholder')),
    confirmPassword: yup.string().oneOf([passValue], i18next.t('signupComponent.confirmPasswordFeedback')),
  });

  const onPasswordChange = (evt) => {
    setPassValue(evt.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={signupSchema}
            onSubmit={(values, handlers) => {
              const message = _.omit(values, 'confirmPassword');
              console.log('signup message: ', message);

              const signupUser = async () => {
                try {
                  const response = await axios.post('/api/v1/signup', message);
                  const { from } = location.state || { from: { pathname: '/' } };
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('username', values.username);
                  history.replace(from);
                } catch (e) {
                  console.log('error from catch', e);
                  const statusCode = +e.message.split(' ').reverse()[0];
                  if (statusCode === 409) {
                    handlers.setErrors({
                      username: '',
                      password: '',
                      confirmPassword: i18next.t('signupComponent.userAlreadyExist'),
                    });
                  }
                }
              };

              signupUser();
            }}
          >
            {(props) => {
              const { errors, touched } = props;

              return (
                <Form className="p-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="username">{i18next.t('signupComponent.username')}</label>
                    <Field
                      placeholder={i18next.t('signupComponent.usernamePlaceholder')}
                      name="username"
                      autoComplete="username"
                      id="username"
                      className={errors.username && touched.username && 'field-error'}
                    />
                    <ErrorMessage name="username" className="error-tooltip" component="span" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">{i18next.t('password')}</label>
                    <Field
                      placeholder={i18next.t('signupComponent.passwordPlaceholder')}
                      name="password" onKeyUp={onPasswordChange} autoComplete="new-password"
                      type="password"
                      id="password"
                      className={errors.password && touched.password && 'field-error'}
                    />
                    <ErrorMessage name="password" className="error-tooltip" component="span" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">{i18next.t('signupComponent.confirmPassword')}</label>
                    <Field
                      placeholder={i18next.t('signupComponent.confirmPasswordFeedback')}
                      name="confirmPassword"
                      autoComplete="new-password"
                      type="password"
                      id="confirmPassword"
                      className={errors.confirmPassword && touched.confirmPassword && 'field-error'}
                    />
                    <ErrorMessage name="confirmPassword" className="error-tooltip" component="span" />
                  </div>
                  <button type="submit" className="w-100 btn btn-outline-primary">{i18next.t('signupComponent.signup')}</button>
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
