import React from 'react';

import testingLibrary from '@testing-library/react';
import ChatForm from '../src/Components/Chat/ChatForm.jsx';

const { render, screen } = testingLibrary;

test('chat form', () => {
  render(<ChatForm />);
  screen.debug();
});
