import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
});

const DayOfWeekChart = ({ data }) => {
  const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDayMapping = data.reduce((acc, item) => {
    const day = moment(item.x).format('ddd');
    if (acc.hasOwnProperty(day)) {
      acc[day].push(item.y);
    } else {
      acc[day] = [item.y];
    }
    return acc;
  }, {});

  const chartData = [];
  daysOfTheWeek.forEach(day => {
    const total = weekDayMapping[day].reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );
    const average = total / weekDayMapping[day].length;
    chartData.push(average.toFixed(3));
  });

  var set1 = {
    label: 'Day of the Week',
    backgroundColor: 'green',
    data: chartData,
  };

  return (
    <View className="chart">
      <Bar
        data={{
          labels: daysOfTheWeek,
          datasets: [set1],
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
