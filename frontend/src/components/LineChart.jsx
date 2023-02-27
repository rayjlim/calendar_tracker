import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData, trendData, goal }) => {
  console.log(chartData);
  const s1 = {
    label: 'Weight',
    borderColor: 'blue',
    pointRadius: 2,
    data: chartData,
  };

  const s2 = {
    label: 'Trend',
    borderColor: 'red',
    fill: 'none',
    data: trendData,
  };
  console.log(`goal ${goal}`);
  const datasets = goal ? [s1, s2, {
    label: 'Goal',
    borderColor: 'purple',
    fill: 'none',
    data: [
      { x: chartData.slice(0)[0].x, y: goal },
      { x: chartData.slice(-1)[0].x, y: goal },
    ],
  }] : [s1, s2];

  return (
    <div className="chart">
      <Line
        data={{ datasets }}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
              },
            ],
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
        }}
      />
    </div>
  );
};

export default Chart;

// Specifies the default values for props:
Chart.defaultProps = {
  goal: null,
};

Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  trendData: PropTypes.array.isRequired,
  goal: PropTypes.number,
};
