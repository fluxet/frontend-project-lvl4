import React from 'react';
import ReactDom from 'react-dom';
import RegeneratorRuntime from 'regenerator-runtime';

import io from 'socket.io-client';
import { render, screen } from '@testing-library/react';
import init from '../src/init.js';

const socket = io();

beforeEach(async () => {
  const vdom = await init(socket);
  render(vdom);
});

test('', () => {
  screen.debug();
});
