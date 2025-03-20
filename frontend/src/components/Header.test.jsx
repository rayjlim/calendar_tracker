/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    const testTitle = 'Test Title';
    render(<Header title="Test Title" />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    const testTitle = 'Tracker App v1.0';
    render(<Header title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  test('has the correct heading level', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('handles empty title gracefully', () => {
    render(<Header title="" />);
    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('');
  });
});
