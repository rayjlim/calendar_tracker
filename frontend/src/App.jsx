import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';

import sub from 'date-fns/sub';
import parse from 'date-fns/parse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Chart from './components/LineChart';
import DayOfWeekChart from './components/DayOfWeekChart';
import Metrics from './components/Metrics';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import AggregateSection from './components/AggregateSection';
import Header from './components/Header';

import {
  ENVIRONMENT, FULL_DATE_FORMAT, REST_ENDPOINT, GOAL_KEY,
} from './constants';
import pkg from '../package.json';

import './components/ribbon.css';

const showDevRibbon = ENVIRONMENT === 'development';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

const average = group => {
  if (!group) {
    return null;
  }
  const sum = group.reduce((a, b) => a + b, 0);
  return (sum / group.length).toFixed(3);
};

const calculateMetrics = records => {
  const today = new Date();

  const oneWeekAgo = sub(today, { days: 7 });
  const twoWeekAgo = sub(today, { days: 14 });
  const oneMonthAgo = sub(today, { months: 1 });

  const currentWeek = records.filter(item => {
    const curr = parse(item.x, 'yyyy-MM-dd', today);
    return oneWeekAgo <= curr && curr <= today;
  });

  const pastWeek = records.filter(item => {
    const curr = parse(item.x, FULL_DATE_FORMAT, today);
    return twoWeekAgo <= curr && curr <= oneWeekAgo;
  });

  const restOfMonth = records.filter(item => {
    const curr = parse(item.x, FULL_DATE_FORMAT, today);
    return oneMonthAgo <= curr && curr <= twoWeekAgo;
  });
  const overallAvg = average(records.map(record => parseFloat(record.y)));
  const currentWeekAvg = average(currentWeek.map(record => parseFloat(record.y)));
  const pastCurrentWeekAvg = average(
    pastWeek.map(record => parseFloat(record.y)),
  );
  const restOfMonthAvg = average(restOfMonth.map(record => parseFloat(record.y)));

  const highest = records.reduce(
    (agg, record) => (agg === null || record.y > agg.y ? record : agg),
    null,
  );

  const lowest = records.reduce(
    (agg, record) => (agg === null || record.y < agg.y ? record : agg),
    null,
  );

  return {
    overallAvg,
    currentWeekAvg,
    pastCurrentWeekAvg,
    restOfMonthAvg,
    highest,
    lowest,
    missedThisWeek: 7 - currentWeek.length,
  };
};

const App = () => {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [goal, setGoal] = useState(null);

  const getChartData = async () => {
    console.log('getChartData');
    const url = `${REST_ENDPOINT}/record/`;
    let response = null;
    setIsLoading(true);

    try {
      response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    } catch (error) {
      toast.error(`Error: ${error}`);
      return;
    }
    if (response.ok) {
      let results;
      try {
        results = await response.json();
      } catch (error) {
        toast.error(`Error: JSON conversion : ${error}`);

        // results = {
        //   params: {},
        //   data: [],
        // };
        return;
      }
      console.log(results);

      // map the data
      const records = results.data.map(record => ({
        id: record.id,
        x: record.date,
        y: record.count,
        label: record.comment,
      }));
      // console.log('records mapped')
      const metricsResults = calculateMetrics(records);
      // console.log('records calculated')
      // moving average
      const movingAverageSize = 10;
      const trendDataResults = [];
      for (let i = 0; i < records.length; i++) {
        const currentSet = records.slice(i - movingAverageSize + 1, i + 1);
        const currentSetAverage = i <= movingAverageSize
          ? metrics.overallAvg
          : average(currentSet.map(record => parseFloat(record.y)));
        trendDataResults.push({
          y: currentSetAverage,
          x: records[i].x,
        });
      }
      console.log('Setting chart data');

      setChartData(records);
      setTrendData(trendDataResults);
      setMetrics(metricsResults);
      setIsLoading(false);
    } else {
      toast.error('Network response was not OK');
      console.log('Network response was not OK');
    }
    setGoal(parseFloat(window.localStorage.getItem(GOAL_KEY)) || null);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <>
      {showDevRibbon && <a className="github-fork-ribbon" href="#dev" data-ribbon="Development" title="Development">Development</a>}
      <View style={styles.appContainer}>
        <ToastContainer />
        <Header title={`Tracker App v${pkg.version}`} />
        <RecordForm onUpdate={getChartData} />
        {isLoading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
          <>
            <RecordList
              records={chartData}
              onUpdate={getChartData}
            />
            <Metrics data={metrics} />
            <Chart
              goal={goal}
              chartData={chartData}
              trendData={trendData}
            />
            <DayOfWeekChart data={chartData} />
            <AggregateSection />
          </>
        )}
      </View>
    </>
  );
};

AppRegistry.registerComponent('App', () => App);

export default App;
