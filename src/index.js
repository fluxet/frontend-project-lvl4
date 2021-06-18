// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import io from 'socket.io-client';
import init from './init.js';

const socket = io();
init(socket);
