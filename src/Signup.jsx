import React, {useState, useContext, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import { render } from 'react-dom';
import formik, {Formik, Field, Form, useFormikContext, useField} from 'formik';
import cn from 'classnames';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import _ from 'lodash';
import {Context} from './context';

const Signup = () => {
  const history = useHistory();
  const location = useLocation();
  
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
  }
  
  const validateField = (fieldName, fieldValue, schema) => {
    setFieldVals(fieldVals => ({...fieldVals, [fieldName]: fieldValue}));
    schema.isValid(fieldValue)
    .then((isValid) => setFieldValidity(fieldValidity => ({...fieldValidity, [fieldName]: isValid})));
  };
  
  const getFieldClassNames = (fieldName) => {
    return cn('form-control', {
      'is-invalid': !(fieldValidity[fieldName] || fieldVals[fieldName] === ''),
    });
  };
  
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">         
          <Formik
            validateOnBlur={true}
            validateOnChange={false}
            initialValues={{username: '', password: '', confirmPassword: ''}}
            onSubmit={(values, handlers) => {
              console.log('onSubmit values: ', values);
              console.log('onSubmit handlers: ', handlers);
              
              const isFormValid = Object.values(fieldValidity).every(isFieldValid => isFieldValid);
              console.log('isFormValid: ', isFormValid);
              if (!isFormValid) {return}
              
              const message = _.omit(fieldVals, 'confirm');
              console.log('signup message: ', message);
              
              const signupUser = async () => {
                try {
                  const response = await axios.post('/api/v1/signup', message);
                  const {from} = location.state || { from: {pathname: '/'} };
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('username', values.username);
                  history.replace(from);
                } catch (e) {
                  console.log('error from catch', e);
                }
              };
              
              signupUser();
            }}
          >
            <Form className="p-3">
              <div className="form-group">
                <label className="form-label" htmlFor="username">{i18next.t('signupComponent.username')}</label>
                <Field placeholder={i18next.t('signupComponent.usernamePlaceholder')} name="username" autoComplete="username" validate={validateUsername} id="username" className={getFieldClassNames('username')} required />
                <div className="invalid-feedback">{i18next.t('signupComponent.invalidFeedback')}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">{i18next.t('password')}</label>
                <Field placeholder={i18next.t('signupComponent.passwordPlaceholder')} name="password" autoComplete="new-password" validate={validatePassword} type="password" id="password" className={getFieldClassNames('password')} required />
                <div className="invalid-feedback">{i18next.t('signupComponent.invalidFeedback')}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">{i18next.t('signupComponent.confirmPassword')}</label>
                <Field placeholder={i18next.t('signupComponent.confirmPasswordFeedback')} name="confirmPassword" autoComplete="new-password" validate={validateConfirmation} className={getFieldClassNames('confirm')} type="password" id="confirmPassword"  required />
                <div className="invalid-feedback">{i18next.t('signupComponent.confirmPasswordFeedback')}</div>
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

//----------------------------------------------------------------------
// <CustomField placeholder="Пароли должны совпадать" name="confirmPassword" autoComplete="new-password"onChange={onConfirmChange} value={confirmationVal} validate={validateConfirmation} type="password" id="confirmPassword" className={confirmationFieldClassNames} required />
