import React, { Fragment, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';

import AggregateChart from './components/AggregateChart';

const AggregateSection = ()=> {

  const [view, setView] = useState({
    showMonthly: false,
    showYearly: false,
    yearForMonthly: 'all',
  });

    const yearsForMonthAgg = [
      'all',
      2021,
      2020,
      2019,
      2018,
      2017,
      2016,
      2015,
      2014,
      2013,
      2012,
      2011,
    ];
    return (
      <View style={styles.appContainer}>
        <View>
          <Text>Show Monthly</Text>
          <Switch
            onValueChange={value => {
              setView({ ...view, showMonthly: value });
            }}
            value={view.showMonthly}
          />
          {view.showMonthly ? (
            <Fragment>
              <select
                onChange={e => {
                  console.log(e.target.value);
                  setView({ ...view, yearForMonthly: e.target.value });
                }}
              >
                {yearsForMonthAgg.map(year => (
                  <option value={year} key={year}> {year}</option>
                ))}
              </select>
              <AggregateChart type="month" year={view.yearForMonthly} />
            </Fragment>
          ) : (
            <Fragment />
          )}
        </View>
        <View>
          <Text>Show Yearly</Text>
          <Switch
            onValueChange={value => {
              setView({ ...view, showYearly: value });
            }}
            value={view.showYearly}
          />
          {view.showYearly ? (
            <AggregateChart type="year" />
          ) : (
            <Fragment />
          )}
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
