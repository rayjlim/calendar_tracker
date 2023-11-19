import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Chart from './components/LineChart';
import DayOfWeekChart from './components/DayOfWeekChart';
import Metrics from './components/Metrics';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import AggregateSection from './components/AggregateSection';
import Header from './components/Header';
import useApp from './hooks/useApp';
import { ENVIRONMENT } from './constants';
import pkg from '../package.json';

import './components/ribbon.css';

const showDevRibbon = ENVIRONMENT === 'development';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

const App = () => {
  const {
    getChartData, isLoading, chartData, metrics, goal, trendData,
  } = useApp();
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
