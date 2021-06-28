import React from 'react';
import ReactDom from 'react-dom';
import RegeneratorRuntime from 'regenerator-runtime';
// import nock from 'nock';

import io from 'socket.io-client';
import '@testing-library/jest-dom/extend-expect';
import { findByTestId, getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import init from '../src/init.js';

const fakeResponsePost = {
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNDQ2NzY4OX0.yyFyjkvqxNoMrr1UOikSFyO0ZPotcnTfyqOAzkEJdnU',
    username: 'admin',
  },
  status: 200,
  statusText: 'OK',
};

const fakeResponseGet = {
  channels: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
  messages: [
    {
      data: {
        attributes: {
          message: 'test1',
          username: 'admin',
          channelId: 1,
        },
      },
      id: 3,
    },
    {
      data: {
        attributes: {
          message: 'ch3 1',
          username: 'admin',
          channelId: 4,
        },
      },
      id: 5,
    },
    {
      data: {
        attributes: {
          message: 'test2',
          username: 'admin',
          channelId: 1,
        },
      },
      id: 6,
    },
    {
      data: {
        attributes: {
          message: 'test3',
          username: 'admin',
          channelId: 1,
        },
      },
      id: 7,
    },
    {
      data: {
        attributes: {
          message: 'test4',
          username: 'admin',
          channelId: 1,
        },
      },
      id: 8,
    },
  ],
  currentChannelId: 1,
};

const socket = io();

describe('authorization', () => {
  test('events', async () => {
  //   nock(/localhost/)
  //     .post(/\/api\/v1\/login/)
  //     .reply(200, fakeResponsePost)
  //     .get(/\/api\/v1\/data/)
  //     .reply(200, fakeResponseGet);

    const vdom = await init(socket);
    const container = render(vdom);
    const { getByTestId, findByTestId, getByText } = container;

    const name = getByTestId(/username/i);
    const password = getByTestId(/password/i);
    // const btnSignup = getByText('Регистрация');
    expect(name).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    // expect(btnSignup).toBeInTheDocument();

    userEvent.click(await screen.findByRole('link', { name: /Регистрация/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });

    // userEvent.type(name, 'admin');
    // userEvent.type(password, `admin${specialChars.enter}`);

    // await waitFor(async () => {
    //   const messageInput = await findByTestId('new-message');
    //   expect(messageInput).toBeInTheDocument();
    //   await screen.debug();
    //   console.log('window.location.pathname: ', window.location.pathname);
    // });
  });
});
