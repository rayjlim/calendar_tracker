import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

it('contains title', () => {
  render(<Header title="tracker title" />);

  const element = screen.getByText(/tracker/);
  expect(element).not.toBeNull();
});
