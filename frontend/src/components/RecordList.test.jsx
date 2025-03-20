/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';
import RecordList from './RecordList';

// Mock RecordItem component
// eslint-disable-next-line arrow-body-style
jest.mock('./RecordItem', () => {
  return function MockRecordItem({ title }) {
    return <div data-testid="record-item">{title}</div>;
  };
});

describe('RecordList Component', () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const mockRecords = [
    {
      id: '1', x: today, y: 70, label: 'Today record',
    },
    {
      id: '2', x: '2023-05-14', y: 71, label: 'Past record',
    },
    {
      id: '3', x: '2023-05-13', y: 72, label: 'Older record',
    },
  ];

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  it('renders only today records by default', () => {
    render(<RecordList records={mockRecords} onUpdate={mockOnUpdate} />);
    const recordItems = screen.getAllByTestId('record-item');
    expect(recordItems).toHaveLength(1);
    expect(recordItems[0]).toHaveTextContent('Today record');
  });

  it('toggles between all records and today records', () => {
    render(<RecordList records={mockRecords} onUpdate={mockOnUpdate} />);

    // Initial state - only today's records
    expect(screen.getAllByTestId('record-item')).toHaveLength(1);

    // Toggle to show all records
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(screen.getAllByTestId('record-item')).toHaveLength(3);

    // Toggle back to today's records
    fireEvent.click(toggle);
    expect(screen.getAllByTestId('record-item')).toHaveLength(1);
  });

  it('displays records in reverse chronological order when showing all', () => {
    render(<RecordList records={mockRecords} onUpdate={mockOnUpdate} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    const recordItems = screen.getAllByTestId('record-item');
    expect(recordItems[0]).toHaveTextContent('Older record');
    expect(recordItems[1]).toHaveTextContent('Past record');
    expect(recordItems[2]).toHaveTextContent('Today record');
  });

  it('handles empty records array', () => {
    render(<RecordList records={[]} onUpdate={mockOnUpdate} />);
    expect(screen.queryByTestId('record-item')).not.toBeInTheDocument();
  });

  it('displays correct date format in record titles', () => {
    render(<RecordList records={mockRecords} onUpdate={mockOnUpdate} />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    const recordItems = screen.getAllByTestId('record-item');
    expect(recordItems[2]).toHaveTextContent(format(new Date(), 'yyyy-MM-dd (EEE)'));
  });

  it('renders switch with correct label', () => {
    render(<RecordList records={mockRecords} onUpdate={mockOnUpdate} />);
    expect(screen.getByText('Show All')).toBeInTheDocument();
  });
});
