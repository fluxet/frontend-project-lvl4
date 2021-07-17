import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Context } from './context.js';
import routes from './routes.js';

const Authorization = () => {
  const { t } = useTranslation();
  const ctx = useContext(Context);
  const history = useHistory();
  const location = useLocation();

  const authorizationSchema = yup.object().shape({
    username: yup.string().required().min(3, t('signupComponent.usernamePlaceholder')).max(20, t('signupComponent.usernamePlaceholder')),
    password: yup.string().required().min(3, t('signupComponent.passwordPlaceholder')).max(20),
  });

  const onSignupClick = (evt) => {
    location.pathname = routes.signupPathName();
    history.push(routes.signupPathName());
    console.log('location.state: ', location);
    evt.preventDefault();
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={authorizationSchema}
            onSubmit={(values, handlers) => {
              const messagePost = {
                username: values.username,
                password: values.password,
              };

              const authorizeUser = async () => {
                try {
                  const response = await axios.post(routes.loginPath(), messagePost);
                  const { from } = location.state || { from: { pathname: '/' } };
                  // ----------------useEffect ?---------------------------
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('username', values.username);
                  ctx.setToken(response.data.token);
                  ctx.setUsername(values.username);
                  // ----------------------------------------------------------
                  history.replace(from);
                } catch (e) {
                  console.log('error from catch: ', e);
                  handlers.setErrors({
                    username: '',
                    password: t('authorizationComponent.invalidFeedback'),
                  });
                }
              };

              authorizeUser();
            }}
          >
            <Form className="p-3">
              <div className="form-group">
                <label className="form-label" htmlFor="username">{t('authorizationComponent.username')}</label>
                <Field id="username" data-testid="username" type="text" name="username" className="form-control" autoComplete="username" required/>
                <ErrorMessage name="username" component="div" className="error-tooltip" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">{t('password')}</label>
                <Field name="password" data-testid="password" autoComplete="current-password" required type="password" id="password" className="form-control"/>
                <ErrorMessage name="password" component="div" className="error-tooltip" />
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('authorizationComponent.login')}</button>
              <div className="d-flex flex-column align-items-center"><span className="small mb-2">{t('authorizationComponent.noAccount')}</span> <a onClick={onSignupClick} href="/signup">{t('authorizationComponent.signup')}</a></div>
            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default Authorization;
