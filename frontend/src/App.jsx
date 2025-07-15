import React, { memo, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry, View, ActivityIndicator,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { ToastContainer } from 'react-toastify';

import Metrics from './components/Metrics';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import AggregateSection from './components/AggregateSection';
import DevRibbon from './components/DevRibbon';
import Header from './components/Header';
import SameDaySection from './components/SameDaySection';
import ErrorBoundary from './components/ErrorBoundary';

import useApp from './hooks/useApp';
import styles from './styles/app.styles';

import pkg from '../package.json';
import 'react-toastify/dist/ReactToastify.css';
import './components/ribbon.css';

const Chart = lazy(() => import('./components/LineChart'));
const DayOfWeekChart = lazy(() => import('./components/DayOfWeekChart'));
const Heatmap = lazy(() => import('./components/Heatmap'));
const MemoizedChart = memo(Chart);
const MemoizedDayOfWeekChart = memo(DayOfWeekChart);
const MemoizedMetrics = memo(Metrics);
const MemoizedHeatmap = memo(Heatmap);

const LoadingSpinner = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator color="#ff8179" size="large" />
  </View>
);
// eslint-disable-next-line
const MainContent = ({ chartData, metrics, goal, trendData, getChartData }) => (
  <>
    <RecordList records={chartData} onUpdate={getChartData} />
    <MemoizedMetrics data={metrics} />
    {chartData.length > 1 && (
      <MemoizedChart
        goal={goal}
        chartData={chartData}
        trendData={trendData}
      />
    )}
    <MemoizedHeatmap />
    <SameDaySection />
    <MemoizedDayOfWeekChart data={chartData} />
    <AggregateSection />
  </>
);

MainContent.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape({
    // Add specific shape requirements if needed
  })).isRequired,
  metrics: PropTypes.object.isRequired,
  goal: PropTypes.number,
  trendData: PropTypes.array.isRequired,
  getChartData: PropTypes.func.isRequired,
};

MainContent.defaultProps = {
  goal: null,
};

const App = () => {
  const {
    getChartData, isLoading, chartData, metrics, goal, trendData,
  } = useApp();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <DevRibbon />
        <ToastContainer />
        <View style={styles.appContainer}>
          <Header title="Tracker App" subtitle={`v${pkg.version}`} />
          <RecordForm onUpdate={getChartData} />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <MainContent
              chartData={chartData}
              metrics={metrics}
              goal={goal}
              trendData={trendData}
              getChartData={getChartData}
            />
          )}
        </View>
      </Suspense>
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent('App', () => App);

export default App;
