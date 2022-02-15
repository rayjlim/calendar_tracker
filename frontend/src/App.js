import React, { Fragment } from 'react';
import pkg from '../package.json';
import { AppRegistry, StyleSheet, View, ActivityIndicator } from 'react-native';

import RecordForm from './components/RecordForm';
import Header from './header';
import Chart from './components/LineChart';
import DayOfWeekChart from './components/DayOfWeekChart';

import Metrics from './components/Metrics';
import RecordList from './components/RecordList';
import AggregateSection from './AggregateSection';
import sub from 'date-fns/sub';
import parse from 'date-fns/parse';
import Constants from './constants';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      chartData: [],
      trendData: [],
      metrics: {},
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  async getChartData() {
    // Ajax calls here
    console.log('getChartData');
    const url = `${Constants.REST_ENDPOINT}record/`;
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
          id: record.id,
          x: record.date,
          y: record.count,
          label: record.comment,
        }));
        const metrics = calculateMetrics(records);

        //moving average
        let movingAverageSize = 10;
        let trendData = [];
        for (let i = 0; i < records.length; i++) {
          let currentSet = records.slice(i - movingAverageSize + 1, i + 1);
          let currentSetAverage =
            i <= movingAverageSize
              ? metrics.overallAvg
              : average(currentSet.map(record => parseFloat(record.y)));
          trendData.push({
            y: currentSetAverage,
            x: records[i].x,
          });
        }
        this.setState({
          chartData: records,
          trendData,
          metrics,
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
    return (
      <View style={styles.appContainer}>
        <Header title={`Tracker App v${pkg.version}`} />
        <RecordForm onUpdate={this.getChartData.bind(this)} />
        {this.state.loading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
          <Fragment>
            <RecordList
              records={this.state.chartData}
              onUpdate={this.getChartData.bind(this)}
            />
            <Metrics data={this.state.metrics} />
            <Chart
              chartData={this.state.chartData}
              trendData={this.state.trendData}
            />
            <DayOfWeekChart data={this.state.chartData} />
            <AggregateSection />
          </Fragment>
        )}
      </View>
    );
  }
}

const calculateMetrics = records => {
  let today = new Date();

  let oneWeekAgo = sub(today, { days: 7 });
  let twoWeekAgo = sub(today, { days: 14 });
  let oneMonthAgo = sub(today, { months: 1 });

  var currentWeek = records.filter(item => {
    let curr = parse(item.x, 'yyyy-MM-dd', new Date());
    return oneWeekAgo <= curr && curr <= today;
  });

  var pastWeek = records.filter(item => {
    let curr = parse(item.x, 'yyyy-MM-dd', new Date());
    return twoWeekAgo <= curr && curr <= oneWeekAgo;
  });

  var restOfMonth = records.filter(item => {
    let curr = parse(item.x, 'yyyy-MM-dd', new Date());
    return oneMonthAgo <= curr && curr <= twoWeekAgo;
  });
  let overallAvg = average(records.map(record => parseFloat(record.y)));
  let currentWeekAvg = average(currentWeek.map(record => parseFloat(record.y)));
  let pastCurrentWeekAvg = average(
    pastWeek.map(record => parseFloat(record.y))
  );
  let restOfMonthAvg = average(restOfMonth.map(record => parseFloat(record.y)));

  let highest = records.reduce((agg, record) => {
    return agg === null || record.y > agg.y ? record : agg;
  }, null);

  let lowest = records.reduce((agg, record) => {
    return agg === null || record.y < agg.y ? record : agg;
  }, null);
  return {
    overallAvg,
    currentWeekAvg,
    pastCurrentWeekAvg,
    restOfMonthAvg,
    highest,
    lowest,
  };
};

const average = group => {
  if (!group) {
    return null;
  }
  let sum = group.reduce((a, b) => a + b, 0);
  return (sum / group.length).toFixed(3);
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('App', () => App);

export default App;
