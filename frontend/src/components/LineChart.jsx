import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ chartData, trendData, goal }) => {
  // console.log(chartData, trendData);
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
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: point => {
                  const output = [];
                  let outputLine1fea = chartData[point.dataIndex].y;
                  const hasTrendData = trendData[point.dataIndex].y !== undefined;
                  if (hasTrendData) {
                    outputLine1fea += `:trend ${trendData[point.dataIndex].y}`;
                  }
                  output.push(outputLine1fea);
                  const hasComment = chartData[point.dataIndex].label !== '';
                  if (hasComment) {
                    output.push(`${chartData[point.dataIndex].label}`);
                  }
                  return output;
                },
              },
            },
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
