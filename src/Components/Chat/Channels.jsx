import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import formik, { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import cn from 'classnames';
import { setCurrentChannelId } from './channelsSlice.js';
import { Context } from '../../context';

const Channels = () => {
  const data = useSelector((state) => state.channels.value);
  const dispatch = useDispatch();
  const currentChannelId = data?.currentChannelId;
  const onChannelClick = (id) => (evt) => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2"><span>Каналы</span><button type="button" className="ml-auto p-0 btn btn-link">+</button></div>
      <ul className="nav flex-column nav-pills nav-fill">
        {!!data.channels && data.channels.map(({ name, id }) => {
          const btnStyleClass = (id === currentChannelId) ? 'btn-primary' : 'btn-light';
          return (
            <li key={id} className="nav-item"><button type="button" onClick={onChannelClick(id)} className={cn('nav-link btn-block mb-2 text-left btn', btnStyleClass)}>{name}</button></li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
