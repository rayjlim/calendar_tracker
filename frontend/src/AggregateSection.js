import React, { Fragment, useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, View, Text, Switch } from 'react-native';
import Constants from './constants';
import AggregateChart from './components/AggregateChart';

const AggregateSection = () => {
  const [showMonthly, setShowMonthly] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [yearsList, setYearsList] = useState(['all']);
  const [yearForMonthlySelected, setYearForMonthlySelected] = useState('all');

  useEffect(() => {
    (async () => {
      const url = `${Constants.REST_ENDPOINT}years/`;
      try {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const results = await response.json();
          console.log('years list response: ' + results);

          setYearsList(['all', ...results.data]);
        } else {
          console.log('Network response was not ok.');
        }
      } catch (error) {
        alert('Error: ' + error);
      }
    })();
  }, [setYearsList]);

  return (
    <View style={styles.appContainer}>
      <View>
        <Text>Show Monthly</Text>
        <Switch
          onValueChange={value => setShowMonthly(value)}
          value={showMonthly}
        />
        {showMonthly ? (
          <Fragment>
            <select
              onChange={e => {
                setYearForMonthlySelected(e.target.value);
              }}
            >
              {yearsList.map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
            <AggregateChart type="month" year={yearForMonthlySelected} />
          </Fragment>
        ) : (
          <Fragment />
        )}
      </View>
      <View>
        <Text>Show Yearly</Text>
        <Switch
          onValueChange={value => setShowYearly(value)}
          value={showYearly}
        />
        {showYearly ? <AggregateChart type="year" /> : <Fragment />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('App', () => AggregateSection);

export default AggregateSection;
