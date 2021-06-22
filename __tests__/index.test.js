import React from 'react';
import ReactDom from 'react-dom';
import RegeneratorRuntime from 'regenerator-runtime';

import io from 'socket.io-client';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import init from '../src/init.js';

const socket = io();

// beforeEach(async () => {
//   const vdom = await init(socket);
//   render(vdom);
// });

describe('authorization', () => {
  test('events', async () => {
    //  screen.debug();
    const vdom = await init(socket);
    const container = render(vdom);
    const { getByTestId } = container;
    const name = getByTestId('username');
    const password = getByTestId('password');

    expect(name).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
