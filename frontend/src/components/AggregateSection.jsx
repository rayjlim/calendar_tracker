import React, { useState, useEffect } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Switch,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { REST_ENDPOINT } from '../constants';
import AggregateChart from './AggregateChart';

const AggregateSection = () => {
  const [showMonthly, setShowMonthly] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [yearsList, setYearsList] = useState(['all']);
  const [yearForMonthReport, setYearForMonthReport] = useState('all');

  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
    },
  });

  useEffect(() => {
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
          // console.log(`years list response: ${results}`);

          setYearsList([...yearsList, ...results.data]);
        } else {
          console.log('Network response was not ok.');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    })();
  }, []);

  return (
    <View style={styles.appContainer}>
      <View>
        <Text>Show Monthly</Text>
        <Switch
          onValueChange={value => setShowMonthly(value)}
          value={showMonthly}
        />
        {showMonthly && (
          <>
            <select
              onChange={e => {
                setYearForMonthReport(e.target.value);
              }}
            >
              {yearsList.map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
            <AggregateChart type="month" year={yearForMonthReport} />
          </>
        )}
      </View>
      <View>
        <Text>Show Yearly</Text>
        <Switch
          onValueChange={value => setShowYearly(value)}
          value={showYearly}
        />
        {showYearly && <AggregateChart type="year" />}
      </View>
    </View>
  );
};

AppRegistry.registerComponent('App', () => AggregateSection);

export default AggregateSection;
