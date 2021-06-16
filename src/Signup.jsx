import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Formik, Field, Form,
} from 'formik';
import cn from 'classnames';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import _ from 'lodash';

const Signup = () => {
  const history = useHistory();
  const location = useLocation();
  const [isUsernameOccupied, setIsUsernameOccupied] = useState(false);
  const [fieldVals, setFieldVals] = useState({
    username: '',
    password: '',
    confirm: '',
  });
  const [fieldValidity, setFieldValidity] = useState({
    username: true,
    password: true,
    confirm: true,
  });

  const validateField = (fieldName, fieldValue, schema) => {
    setFieldVals((oldFieldVals) => ({ ...oldFieldVals, [fieldName]: fieldValue }));
    schema.isValid(fieldValue)
      .then((isValid) => {
        setFieldValidity((oldFieldValidity) => ({ ...oldFieldValidity, [fieldName]: isValid }));
      });
  };

  const validateUsername = (username) => {
    const schema = yup.string().min(3).max(20);
    validateField('username', username, schema);
  };
  const validatePassword = (password) => {
    const schema = yup.string().min(6);
    validateField('password', password, schema);
  };
  const validateConfirmation = (confirm) => {
    const schema = yup.string().oneOf([fieldVals.password]);
    validateField('confirm', confirm, schema);
  };

  const getFieldClassNames = (fieldName) => cn('form-control', {
    'is-invalid': !(fieldValidity[fieldName] || fieldVals[fieldName] === ''),
  });

  const invalidFeedBackContent = (isUsernameOccupied)
    ? {
      name: i18next.t('signupComponent.userAlreadyExist'),
      password: i18next.t('signupComponent.userAlreadyExist'),
      confirmPassword: i18next.t('signupComponent.userAlreadyExist'),
    }
    : {
      name: i18next.t('signupComponent.invalidFeedback'),
      password: i18next.t('signupComponent.invalidFeedback'),
      confirmPassword: i18next.t('signupComponent.signup'),
    };

  const feedbackStyle = (isUsernameOccupied) ? { display: 'block' } : {};

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            validateOnBlur={true}
            validateOnChange={false}
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            onSubmit={(values, handlers) => {
              console.log('onSubmit values: ', values);
              console.log('onSubmit handlers: ', handlers);

              const isFormValid = Object.values(fieldValidity)
                .every((isFieldValid) => isFieldValid);
              console.log('isFormValid: ', isFormValid);
              if (!isFormValid) { return; }

              const message = _.omit(fieldVals, 'confirm');
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
                    setIsUsernameOccupied(true);
                  }
                }
              };

              signupUser();
            }}
          >
            <Form className="p-3">
              <div className="form-group">
                <label className="form-label" htmlFor="username">{i18next.t('signupComponent.username')}</label>
                <Field placeholder={i18next.t('signupComponent.usernamePlaceholder')} name="username" autoComplete="username" validate={validateUsername} id="username" className={getFieldClassNames('username')} required />
                <div className="invalid-feedback" style={feedbackStyle}>{invalidFeedBackContent.name}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">{i18next.t('password')}</label>
                <Field placeholder={i18next.t('signupComponent.passwordPlaceholder')} name="password" autoComplete="new-password" validate={validatePassword} type="password" id="password" className={getFieldClassNames('password')} required />
                <div className="invalid-feedback" style={feedbackStyle}>{invalidFeedBackContent.password}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">{i18next.t('signupComponent.confirmPassword')}</label>
                <Field placeholder={i18next.t('signupComponent.confirmPasswordFeedback')} name="confirmPassword" autoComplete="new-password" validate={validateConfirmation} className={getFieldClassNames('confirm')} type="password" id="confirmPassword" required />
                <div className="invalid-feedback" style={feedbackStyle}>{invalidFeedBackContent.confirmPassword}</div>
              </div>
              <button type="submit" className="w-100 btn btn-outline-primary">{i18next.t('signupComponent.signup')}</button>
            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default Signup;
