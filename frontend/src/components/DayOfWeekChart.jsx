import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { View, StyleSheet } from 'react-native';
import { parse, format } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const styles = StyleSheet.create({
  appContainer: {
    margin: '0',
  },
});

const DayOfWeekChart = ({ data }) => {
  const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDayMapping = data.reduce((acc, item) => {
    const day = format(parse(item.x, 'yyyy-MM-dd', new Date()), 'EEE');
    acc[day].push(item.y);
    return acc;
  }, {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],

  });
  console.log('weekDayMapping', weekDayMapping);
  const chartData = [];
  daysOfTheWeek.forEach(day => {
    const total = weekDayMapping[day].reduce(
      (a, b) => parseFloat(a) + parseFloat(b),
      0,
    );
    const average = total / weekDayMapping[day].length;
    chartData.push(average.toFixed(3));
  });
  const yMinValue = Math.min(...chartData);
  const yMaxValue = Math.max(...chartData);
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: data2 => `Value: ${data2.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        min: yMinValue - 1,
        max: yMaxValue + 1,
        suggestedMin: 140,
        suggestedMax: 155,
      },
    },
    datalabels: {
      // formatter: value => { "₺" + new Intl.NumberFormat("tr-TR").format(value) },
      color: 'white',
      font: {
        weight: 'bold',
        size: 14,
        family: 'poppins',
      },
    },
  };
  const backgroundColors = ['#53D9D9', '#002B49', '#0067A0'];
  const dataReady = {
    labels: daysOfTheWeek,
    datasets: [
      {
        label: daysOfTheWeek,
        data: chartData,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <View className="chart" style={styles.appContainer}>
      <Bar
        data={dataReady}
        options={options}

      // {
      //   labels: daysOfTheWeek,
      //   datasets: [{
      //     label: 'Day of the Week',
      //     backgroundColor: 'green',
      //     data: chartData,
      //   }],
      // }
      // options={{
      //   hover: {
      //     mode: 'index',
      //     intersect: false,
      //   },
      // }}
      />
    </View>
  );
};

export default DayOfWeekChart;

DayOfWeekChart.propTypes = {
  data: PropTypes.array.isRequired,
};
