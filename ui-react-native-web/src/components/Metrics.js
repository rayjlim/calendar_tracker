import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
});

const Metrics = ({ data }) => {
  return (
    <View>
      <Text>Current Week Avg: {data.currentWeekAvg}</Text>
      <Text>Previous Week Avg: {data.pastCurrentWeekAvg}</Text>
      <Text>Rest Of Month Avg: {data.restOfMonthAvg}</Text>
      <Text>Overall Avg: {data.overallAvg}</Text>
      <Text>
        Highest: {data.highest.y} on {data.highest.x}
      </Text>
      <Text>
        Lowest: {data.lowest.y} on {data.lowest.x}
      </Text>
    </View>
  );
};

export default Metrics;
