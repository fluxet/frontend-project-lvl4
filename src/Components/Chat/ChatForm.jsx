import React, {useState, useContext} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import { render } from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';
import formik, {Formik, Field, Form} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import cn from 'classnames';
import io from 'socket.io-client';
import {addChannel} from './channelsSlice.js';
import {Context} from '../../context';

const ChatForm = () => {
  const socket= io();
  const {username} = useContext(Context);
  console.log('-------------chat form user: ', username);
  
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit evt: ', evt);
  };
  
  return (
    <div className="mt-auto">
      <Formik
        initialValues={{body: ''}}
        onSubmit={({body}) => {
          socket.emit('newMessage', {
            data: {
              attributes: {
                message: body,
                username,
              }
            }
          }, (response) => {
            console.log('socket response: ', response);
            
            
          });
        }}
      >
        <Form noValidate="" className="" onSubmit={onFormSubmit}>
          <div className="input-group">
            <Field type="text" name="body" aria-label="body" className="form-control" />
            <div className="input-group-append"><button type="submit" className="btn btn-primary">Отправить</button></div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatForm;
