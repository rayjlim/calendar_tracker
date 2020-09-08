import React, { Fragment } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';

import AggregateChart from './components/AggregateChart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showMonthly: false,
      showYearly: false,
      yearForMonthly: 'all',
    };
  }
  componentDidMount() {}

  render() {
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
              this.setState({ showMonthly: value });
            }}
            value={this.state.showMonthly}
          />
          {this.state.showMonthly ? (
            <Fragment>
              <select
                onChange={e => {
                  console.log(e.target.value);
                  this.setState({ yearForMonthly: e.target.value });
                }}
              >
                {yearsForMonthAgg.map(year => (
                  <option value={year}> {year}</option>
                ))}
              </select>
              <AggregateChart type="month" year={this.state.yearForMonthly} />
            </Fragment>
          ) : (
            <Fragment />
          )}
        </View>
        <View>
          <Text>Show Yearly</Text>
          <Switch
            onValueChange={value => {
              this.setState({ showYearly: value });
            }}
            value={this.state.showYearly}
          />
          {this.state.showYearly ? (
            <AggregateChart type="year" />
          ) : (
            <Fragment />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('App', () => App);

export default App;
