import React, { useEffect, useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Switch,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import CalendarHeatmap from 'react-calendar-heatmap';

import { REST_ENDPOINT } from '../constants';

import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = () => {
  const [showSection, setShowSection] = useState(true);
  const [yearLogs, setYearLogs] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [yearForReport, setYearForReport] = useState('2025');

  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
    },
  });

  const getHeatmapData = () => {
    console.log(REST_ENDPOINT);
    (async () => {
      const url = `${REST_ENDPOINT}/yearLogs/?year=${yearForReport}`;
      try {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const results = await response.json();

          const countResults = results.map(x => {
            const y = {};
            y.date = x.date;
            y.count = 2;
            return y;
          });

          if (yearForReport === '2025') {
            const today = new Date();
            const endOfYear = new Date(today.getFullYear(), 11, 31); // December 31st
            let currentDate = new Date(today);

            while (currentDate <= endOfYear) {
              countResults.push({
                date: currentDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
                count: 4, // Customize the value if needed
              });
              currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
              // Increment by 1 day
            }
          }

          setYearLogs([...countResults]);
        } else {
          console.log('Network response was not ok.');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    })();
  };
  const getYearsData = () => {
    (async () => {
      const url = `${REST_ENDPOINT}/years/`;
      try {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const results = await response.json();
          setYearsList([...results.data]);
        } else {
          console.log('Network response was not ok.');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    })();
  };
  const trigger = value => {
    setShowSection(value);
    getHeatmapData();
  };

  useEffect(() => {
    if (showSection) {
      getHeatmapData();
    }
    if (!yearsList.length) {
      getYearsData();
    }
  }, [yearForReport]);

  return (
    <View style={styles.appContainer}>
      <View>
        <Text>Show Heatmap</Text>
        <Switch
          onValueChange={value => trigger(value)}
          value={showSection}
        />
        {showSection && (
          <>
            <select
              onChange={e => {
                setYearForReport(e.target.value);
              }}
            >
              {yearsList.map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
            <CalendarHeatmap
              startDate={new Date(`${yearForReport}-01-01`)}
              endDate={new Date(`${yearForReport}-12-31`)}
              values={yearLogs}
              onClick={value => alert(value.date)}
              classForValue={value => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

AppRegistry.registerComponent('App', () => Heatmap);

export default Heatmap;
