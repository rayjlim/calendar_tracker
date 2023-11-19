import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { View, StyleSheet } from 'react-native';
import { parse, format } from 'date-fns';
import { Bar } from 'react-chartjs-2';

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

  return (
    <View className="chart" style={styles.appContainer}>
      <Bar
        data={{
          labels: daysOfTheWeek,
          datasets: [{
            label: 'Day of the Week',
            backgroundColor: 'green',
            data: chartData,
          }],
        }}
        options={{
          hover: {
            mode: 'index',
            intersect: false,
          },
        }}
      />
    </View>
  );
};

export default DayOfWeekChart;

DayOfWeekChart.propTypes = {
  data: PropTypes.array.isRequired,
};
