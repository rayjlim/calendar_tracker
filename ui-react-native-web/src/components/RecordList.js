import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import moment from "moment";

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
});

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => <Item title={item.title} />;

const RecordList = ({ records, showAll }) => {
  const displayRecords = showAll
    ? records.reverse()
    : records.filter((record) => record.x === moment().format("YYYY-MM-DD"));
  const DATA = displayRecords.map((record) => ({
    id: record.x+"-"+record.y+":"+Math.random(),
    title: `${record.x}, ${record.y}, ${record.label}`,
  }));

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RecordList;
