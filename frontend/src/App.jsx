import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';

import { ToastContainer } from 'react-toastify';

import Chart from './components/LineChart';
import DayOfWeekChart from './components/DayOfWeekChart';
import Metrics from './components/Metrics';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import AggregateSection from './components/AggregateSection';
import DevRibbon from './components/DevRibbon';
import Header from './components/Header';
import SameDaySection from './components/SameDaySection';
import Heatmap from './components/Heatmap';

import useApp from './hooks/useApp';

import pkg from '../package.json';

import 'react-toastify/dist/ReactToastify.css';
import './components/ribbon.css';

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
      <DevRibbon />
      <ToastContainer />
      <View style={styles.appContainer}>
        <Header title={`Tracker App v${pkg.version}`} />
        <RecordForm onUpdate={getChartData} />
        {isLoading ? (
          <ActivityIndicator color="#ff8179" size="large" />
        ) : (
          <>
            <RecordList records={chartData} onUpdate={getChartData} />
            <Metrics data={metrics} />
            <Chart goal={goal} chartData={chartData} trendData={trendData} />
            <Heatmap />
            <SameDaySection />
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
