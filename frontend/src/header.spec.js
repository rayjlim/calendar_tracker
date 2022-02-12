import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

test('renders learn react link', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Logs/i);
  expect(linkElement).toBeInTheDocument();

  const btnGraphs= getByText(/Graphs/i);
  expect(btnGraphs).toBeInTheDocument();
});
