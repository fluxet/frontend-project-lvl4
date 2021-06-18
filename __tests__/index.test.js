import React from 'react';
import io from 'socket.io-client';
import testingLibrary from '@testing-library/react';
import init from '../src/index';

const { render, screen } = testingLibrary;
const socket = io();

beforeEach(async () => {
  const vdom = await init(socket);
  render(vdom);
});

test('test of test', () => {
  screen.debug();
});
