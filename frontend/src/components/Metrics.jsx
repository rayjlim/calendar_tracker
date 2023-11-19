import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  metrics: {
    marginLeft: '.5rem',
  },
});

const Metrics = ({ data }) => {
  const {
    currentWeekAvg, missedThisWeek, pastCurrentWeekAvg, restOfMonthAvg, overallAvg, highest, lowest,
  } = data;

  return (
    <View style={styles.metrics}>
      <Text>
        {`Current Week Avg: ${currentWeekAvg}, Current Week Missed: ${missedThisWeek}`}
      </Text>
      <Text>
        {`Previous Week Avg: ${pastCurrentWeekAvg}`}
      </Text>
      <Text>
        {`Rest Of Month Avg: ${restOfMonthAvg}`}
      </Text>
      <Text>
        {`Overall Avg: ${overallAvg}`}
      </Text>
      {highest && (
        <Text>
          {`Highest: ${highest?.y} on ${highest?.x}`}
        </Text>
      )}
      {lowest && (
        <Text>
          {`Lowest: ${lowest?.y} on ${lowest?.x}`}
        </Text>
      )}

    </View>
  );
};

export default Metrics;

Metrics.propTypes = {
  data: PropTypes.object.isRequired,
};
