/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import DayOfWeekChart from './DayOfWeekChart';

// Mock chart.js
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

describe('DayOfWeekChart Component', () => {
  const mockData = [
    { x: '2023-05-15', y: 150 }, // Monday
    { x: '2023-05-16', y: 151 }, // Tuesday
    { x: '2023-05-17', y: 152 }, // Wednesday
    { x: '2023-05-18', y: 153 }, // Thursday
    { x: '2023-05-19', y: 154 }, // Friday
    { x: '2023-05-20', y: 155 }, // Saturday
    { x: '2023-05-21', y: 156 }, // Sunday
  ];

  it('renders without crashing', () => {
    const { getByTestId } = render(<DayOfWeekChart data={mockData} />);
    expect(getByTestId('bar-chart')).toBeInTheDocument();
  });

  // it('processes data correctly for each day of the week', () => {
  //   const consoleSpy = jest.spyOn(console, 'log');
  //   render(<DayOfWeekChart data={mockData} />);

  //   expect(consoleSpy).toHaveBeenCalledWith('weekDayMapping', expect.objectContaining({
  //     Mon: expect.arrayContaining([150]),
  //     Tue: expect.arrayContaining([151]),
  //     Wed: expect.arrayContaining([152]),
  //     Thu: expect.arrayContaining([153]),
  //     Fri: expect.arrayContaining([154]),
  //     Sat: expect.arrayContaining([155]),
  //     Sun: expect.arrayContaining([156]),
  //   }));

  //   consoleSpy.mockRestore();
  // });

  it('handles empty data array', () => {
    const { getByTestId } = render(<DayOfWeekChart data={[]} />);
    expect(getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('validates props', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<DayOfWeekChart data={mockData} />);
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('applies correct styling', () => {
    const { container } = render(<DayOfWeekChart data={mockData} />);
    const chartContainer = container.firstChild;
    expect(chartContainer).toHaveStyle({ margin: '0' });
  });
});
