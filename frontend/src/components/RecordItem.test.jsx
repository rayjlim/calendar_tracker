/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { toast } from 'react-toastify';
import RecordItem from './RecordItem';
import { REST_ENDPOINT } from '../constants';

// Mock toast and fetch
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  error: jest.fn(),
}));

global.fetch = jest.fn();
global.confirm = jest.fn();

describe('RecordItem Component', () => {
  const mockProps = {
    title: 'Test Record',
    id: 123,
    showDelete: true,
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    fetch.mockClear();
    toast.mockClear();
    global.confirm.mockClear();
    mockProps.onUpdate.mockClear();
  });

  it('renders record title', () => {
    render(<RecordItem {...mockProps} />);
    expect(screen.getByText('Test Record')).toBeInTheDocument();
  });

  it('shows delete button when showDelete is true', () => {
    render(<RecordItem {...mockProps} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('hides delete button when showDelete is false', () => {
    render(<RecordItem {...mockProps} showDelete={false} />);
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });

  it('confirms before deletion', async () => {
    global.confirm.mockReturnValue(false);
    render(<RecordItem {...mockProps} />);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    expect(global.confirm).toHaveBeenCalledWith('You sure?');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('deletes record when confirmed', async () => {
    global.confirm.mockReturnValue(true);
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
    }));

    render(<RecordItem {...mockProps} />);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${REST_ENDPOINT}/record/${mockProps.id}`,
        expect.objectContaining({
          method: 'DELETE',
          cache: 'no-cache',
        }),
      );
      expect(toast).toHaveBeenCalledWith(`Deleted ${mockProps.id}`);
      expect(mockProps.onUpdate).toHaveBeenCalled();
    });
  });

  // it('handles deletion error', async () => {
  //   global.confirm.mockReturnValue(true);
  //   const mockError = new Error('Network error');
  //   fetch.mockRejectedValueOnce(mockError);

  //   render(<RecordItem {...mockProps} />);

  //   const deleteButton = screen.getByRole('button', { name: 'Delete' });
  //   fireEvent.click(deleteButton);

  //   await waitFor(() => {
  //     expect(error).toHaveBeenCalledWith(`Error: ${mockError}`);
  //   });
  // });

  it('applies correct styling', () => {
    render(<RecordItem {...mockProps} />);
    const titleElement = screen.getByText('Test Record');
    expect(titleElement).toHaveStyle({
      marginLeft: '1rem',
      marginRight: '1rem',
    });
  });
});
