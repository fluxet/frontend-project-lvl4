import React from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import testingLibrary from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from '../src/App.jsx'; // приложение импортируется как зависимость

// beforeEach(async () => { // выполнится перед каждым тест-кейсом
//   const vdom = await init(socket.socketClient); // ожидаемый интерфейс вашего приложения
//   render(vdom);
// });

const { render, screen } = testingLibrary;

test('first test', () => {
  console.log('App: ', <App />);
  const vdom = render(<App />);
  console.log('vdom: ', vdom);
  expect(vdom).toHaveTextContent('Hexlet-Chat');
});
