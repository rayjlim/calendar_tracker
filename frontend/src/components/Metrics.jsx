import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionsContainer: {},
});

const Metrics = ({ data }) => (
  <View style={styles.appContainer}>
    <Text>
      Current Week Avg:
      {' '}
      {data.currentWeekAvg}
    </Text>
    <Text>
      Previous Week Avg:
      {' '}
      {data.pastCurrentWeekAvg}
    </Text>
    <Text>
      Rest Of Month Avg:
      {' '}
      {data.restOfMonthAvg}
    </Text>
    <Text>
      Overall Avg:
      {' '}
      {data.overallAvg}
    </Text>
    <Text>
      Highest:
      {' '}
      {data.highest.y}
      {' '}
      on
      {' '}
      {data.highest.x}
    </Text>
    <Text>
      Lowest:
      {' '}
      {data.lowest.y}
      {' '}
      on
      {' '}
      {data.lowest.x}
    </Text>
  </View>
);

export default Metrics;

Metrics.propTypes = {
  data: PropTypes.object.isRequired,
};