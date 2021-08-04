// @ts-check

import Rollbar from 'rollbar';
import ReactDom from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import io from 'socket.io-client';
import init from './init.jsx';

// const rollbar = new Rollbar({
//   accessToken: process.env.TOKEN,
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// });
// rollbar.log('rollbar debug v1');

const rendering = async () => {
  const socket = io();
  const vdom = await init(socket);

  ReactDom.render(
    vdom,
    document.getElementById('chat'),
  );
};

rendering();
