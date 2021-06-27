import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';

const Authorization = () => {
  const history = useHistory();
  const location = useLocation();

  const [isAuthorized, setAuthorized] = useState(true);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values) => {
              console.log('submit values: ', values);
              const schema = yup.object().shape({
                username: yup.string(),
                password: yup.string().min(3).max(20),
              });
              const messagePost = {
                username: values.username,
                password: values.password,
              };

              const authorizeUser = async () => {
                try {
                  await schema.validate(values);

                  const response = await axios.post('/api/v1/login', messagePost);
                  const { from } = location.state || { from: { pathname: '/' } };
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('username', values.username);

                  history.replace(from);
                  setAuthorized(true);
                } catch (e) {
                  console.log('error from catch: ', e);
                  setAuthorized(false);
                }
              };

              authorizeUser();
            }}
          >
            <Form className="p-3">
              <div className="form-group">
                <label className="form-label" htmlFor="username">{i18next.t('authorizationComponent.username')}</label>
                <Field id="username" data-testid="username" type="text" name="username" className="form-control" autoComplete="username" required/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">{i18next.t('password')}</label>
                <Field name="password" data-testid="password" autoComplete="current-password" required type="password" id="password" className="form-control"/>
                {!isAuthorized && <div className="invalid-feedback" style={{ display: 'block' }}>{i18next.t('authorizationComponent.invalidFeedback')}</div>}
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{i18next.t('authorizationComponent.login')}</button>
              <div className="d-flex flex-column align-items-center"><span className="small mb-2">{i18next.t('authorizationComponent.noAccount')}</span> <a href="/signup">{i18next.t('authorizationComponent.signup')}</a></div>
            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default Authorization;
