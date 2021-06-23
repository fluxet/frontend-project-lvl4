import React from 'react';
import ReactDom from 'react-dom';
import RegeneratorRuntime from 'regenerator-runtime';

import io from 'socket.io-client';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import init from '../src/init.js';

const fakeAxios = {
  post: () => {
    const fakeResponse = {"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNDQ2NzY4OX0.yyFyjkvqxNoMrr1UOikSFyO0ZPotcnTfyqOAzkEJdnU","username":"admin"},"status":200,"statusText":"OK","headers":{"connection":"keep-alive","content-length":"151","content-type":"application/json; charset=utf-8","date":"Wed, 23 Jun 2021 17:01:29 GMT","keep-alive":"timeout=5"},"config":{"url":"/api/v1/login","method":"post","data":"{\"username\":\"admin\",\"password\":\"admin\"}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1},"request":{"__rollbar_xhr":{"method":"POST","url":"/api/v1/login","status_code":200,"start_time_ms":1624467689435,"end_time_ms":1624467689440,"request_content_type":"application/json;charset=utf-8","subtype":"xhr","response_content_type":"application/json; charset=utf-8"},"__rollbar_event":{"level":"info","type":"network","timestamp_ms":1624467689439,"body":{"method":"POST","url":"/api/v1/login","status_code":200,"start_time_ms":1624467689435,"end_time_ms":1624467689440,"request_content_type":"application/json;charset=utf-8","subtype":"xhr","response_content_type":"application/json; charset=utf-8"},"source":"client"}}};
    return fakeResponse;
  },
};

const socket = io();

// beforeEach(async () => {
//   const vdom = await init(socket);
//   render(vdom);
// });

describe('authorization', () => {
  test('events', async () => {
    //  screen.debug();
    const vdom = await init(socket, fakeAxios);
    const container = render(vdom);
    const { getByTestId, findByText } = container;
    const name = getByTestId(/username/i);
    const password = getByTestId(/password/i);

    expect(name).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    userEvent.type(name, 'admin');
    userEvent.type(password, `admin${specialChars.enter}`);

    const channelsTitle = await findByText(/Каналы/i);
    expect(channelsTitle).toBeInTheDocument();
    // screen.debug();
  });
});
