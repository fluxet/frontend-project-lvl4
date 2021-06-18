import React from 'react';
import RegeneratorRuntime from 'regenerator-runtime';

import io from 'socket.io-client';
import testingLibrary from '@testing-library/react';
import init from '../src/init.js';

const { render, screen } = testingLibrary;
const socket = io();

beforeEach(() => {
  const vdom = init(socket);
  render(vdom);
});

test('test of test', () => {
  screen.debug();
});
