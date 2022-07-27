import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData, trendData }) => {
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

  return (
    <div className="chart">
      <Line
        data={{ datasets: [s1, s2] }}
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

// static defaultProps = {
//   displayTitle: true,
//   displayLegend: true,
//   legendPosition: 'right',
//   location: 'City',
// };

Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  trendData: PropTypes.array.isRequired,
};
