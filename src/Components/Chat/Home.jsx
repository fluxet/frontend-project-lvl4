import React, {useState, useContext} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { render } from 'react-dom';
import formik, {Formik, Field, Form} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import {Context} from '../../context';
import Channels from './Channels';
import Messages from './Messages';
import ChatForm from './ChatForm';
import { setData, setCurrentChannelId } from './channelsSlice.js'; 

const Home = () => {
  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };
  console.log('Home context: ', ctx);
  console.log('options: ', options);
  
  if (ctx.token !== 'null') {
    axios.get('/api/v1/data', options)
    .then(resp => {
      console.log('home get response: ', resp);
      dispatch(setData(resp.data));
    })
    .catch(err => console.log('home get error: ', err));
  }
  
  return (
    <div className="row flex-grow-1 h-75 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default Home;

