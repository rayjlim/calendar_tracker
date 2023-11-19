import { useEffect, useState } from 'react';

import sub from 'date-fns/sub';
import parse from 'date-fns/parse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FULL_DATE_FORMAT, REST_ENDPOINT, GOAL_KEY,
} from '../constants';

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

const useApp = () => {
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

  return {
    getChartData, isLoading, chartData, metrics, goal, trendData,
  };
};

export default useApp;
