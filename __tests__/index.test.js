import React from 'react';
import ReactDom from 'react-dom';
import RegeneratorRuntime from 'regenerator-runtime';

import io from 'socket.io-client';
import { render, screen } from '@testing-library/react';

const socket = io();

beforeEach(async () => {
  const init = await (await import('../src/init.js')).default;
  console.log('init: ', init);

  const vdom = await init(socket);
  render(vdom);
});

test('test of test', () => {
  screen.debug();
});

// import init from '../src/init.js'; // приложение импортируется как зависимость

// beforeEach(async () => { // выполнится перед каждым тест-кейсом
//   const vdom = await init(socket.socketClient); // ожидаемый интерфейс вашего приложения
//   render(vdom);
// });

// test('', () => {
//   screen.debug();
// });
