import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { Bar } from 'react-chartjs-2';
import { REST_ENDPOINT } from '../constants';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

const AggregateChart = ({ type, year }) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  const getChartData = async () => {
    const yearFilter = year !== 'all' ? `&start=${year}-01-01&end=${year}-12-31` : '';

    const url = `${REST_ENDPOINT}/aggregate/?by=${type}${yearFilter}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      if (response.ok) {
        const results = await response.json();
        console.log(results);

        const records = results.data.map(record => ({
          x:
            type === 'month'
              ? monthNames[record.month - 1]
              : record.year,
          y: parseFloat(record.average).toFixed(3),
        }));
        setChartData(records);
        setLoading(false);
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getChartData();
  }, [year]);

  console.log(chartData);
  const set1 = {
    label: type,
    backgroundColor: 'red',
    borderColor: 'pink',
    data: chartData,
  };

  return (
    <View style={styles.appContainer}>
      {loading ? (
        <ActivityIndicator
          style={[styles.centering]}
          color="#ff8179"
          size="large"
        />
      ) : (
        <View className="chart">
          <Bar
            data={{
              labels: chartData.map(record => record.x),
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
      )}
    </View>
  );
};

export default AggregateChart;

AggregateChart.propTypes = {
  type: PropTypes.string.isRequired,
  year: PropTypes.string,
};

AggregateChart.defaultProps = {
  year: 'all',
};
