/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Metrics from './Metrics';

describe('Metrics Component', () => {
  const mockData = {
    currentWeekAvg: '70.5',
    missedThisWeek: '2',
    pastCurrentWeekAvg: '71.0',
    restOfMonthAvg: '70.8',
    overallAvg: '70.9',
    highest: { y: '72.5', x: '2023-05-15' },
    lowest: { y: '69.5', x: '2023-05-10' },
  };

  it('renders all metrics when complete data is provided', () => {
    render(<Metrics data={mockData} />);

    expect(screen.getByText(/Current Week Avg: 70.5/)).toBeInTheDocument();
    expect(screen.getByText(/Current Week Missed: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Previous Week Avg: 71.0/)).toBeInTheDocument();
    expect(screen.getByText(/Rest Of Month Avg: 70.8/)).toBeInTheDocument();
    expect(screen.getByText(/Overall Avg: 70.9/)).toBeInTheDocument();
    expect(screen.getByText(/Highest: 72.5 on 2023-05-15/)).toBeInTheDocument();
    expect(screen.getByText(/Lowest: 69.5 on 2023-05-10/)).toBeInTheDocument();
  });

  it('renders without highest and lowest when not provided', () => {
    const partialData = {
      currentWeekAvg: '70.5',
      missedThisWeek: '2',
      pastCurrentWeekAvg: '71.0',
      restOfMonthAvg: '70.8',
      overallAvg: '70.9',
    };

    render(<Metrics data={partialData} />);

    expect(screen.queryByText(/Highest:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Lowest:/)).not.toBeInTheDocument();
  });

  it('handles empty data object', () => {
    const emptyData = {
      currentWeekAvg: '',
      missedThisWeek: '',
      pastCurrentWeekAvg: '',
      restOfMonthAvg: '',
      overallAvg: '',
    };

    render(<Metrics data={emptyData} />);

    expect(screen.getByText(/Current Week Avg: ,/)).toBeInTheDocument();
    expect(screen.getByText(/Current Week Missed:/)).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<Metrics data={mockData} />);
    const metricsContainer = screen.getByText(/Current Week Avg/).parentElement;
    expect(metricsContainer).toHaveStyle({ marginLeft: '.5rem' });
  });
});
