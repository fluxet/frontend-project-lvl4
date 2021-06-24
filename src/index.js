// @ts-check

import Rollbar from 'rollbar';
import React from 'react';
import ReactDom from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import io from 'socket.io-client';
import init from './init.js';

const rendering = async () => {
  const socket = io();
  const vdom = await init(socket);

  const rollbar = new Rollbar({
    accessToken: '6a1bca2b15284ca8b12e0edc8adcd0d8',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  rollbar.log('run rollbar');

  ReactDom.render(
    vdom,
    document.getElementById('chat'),
  );
};

rendering();
