import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import formik, { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import _ from 'lodash';
import cn from 'classnames';
import { addChannel } from './channelsSlice.js';
import { Context } from '../../context';

const Messages = (props) => {
  const data = useSelector((state) => state);
  const { messages } = data.channels.value;
  console.log('Messages : ', messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map(({ data: { attributes: { message, username } } }) => <div key={_.uniqueId()} className="text-break"><b>{username}</b>: {message}</div>)}
    </div>
  );
};

export default Messages;
