import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Constants from '../constants';
import { Bar } from 'react-chartjs-2';

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
class AggregateChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      type: props.type,
      year: props.year,
      loading: true,
      chartData: [],
    };
  }

  static defaultProps = {
    type: 'month',
    year: 'all',
  };

  componentDidMount() {
    this.getChartData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year) {
      console.log('redraw');
      this.getChartData(this.props.year);
    }
  }

  async getChartData(year = this.state.year) {
    const yearFilter =
      year !== 'all' ? `&start=${year}-01-01&end=${year}-12-31` : '';

    const url = `${Constants.REST_ENDPOINT}aggregate/?by=${this.state.type}${yearFilter}`;
    try {
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      if (response.ok) {
        const results = await response.json();
        console.log(results);
        //map the data

        const records = results.data.map(record => ({
          x:
            this.state.type === 'month'
              ? monthNames[record.month - 1]
              : record.year,
          y: parseFloat(record.average).toFixed(3),
        }));

        this.setState({
          chartData: records,
          loading: false,
        });
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  }

  render() {
    console.log(this.state.chartData);
    var set1 = {
      label: this.state.type,
      backgroundColor: 'red',
      borderColor: 'pink',
      data: this.state.chartData,
    };

    return (
      <View style={styles.appContainer}>
        {this.state.loading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
          <View className="chart">
            <Bar
              data={{
                labels: this.state.chartData.map(record => record.x),
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
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
export default AggregateChart;
