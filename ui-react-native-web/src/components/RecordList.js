import React, { Fragment, useState } from 'react';
import { Text, View, StyleSheet, Switch, FlatList, Button } from 'react-native';
import moment from 'moment';
import Constants from '../constants';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
});

const RecordList = ({ records, onUpdate }) => {
  const [showAll, setShowAll] = useState(false);

  const displayRecords = showAll
    ? records.reverse()
    : records.filter(record => record.x === moment().format('YYYY-MM-DD'));

  const DATA = displayRecords.map(record => ({
    id: record.id,
    title: `${moment(record.x).format('YYYY-MM-DD (ddd)')}, ${record.y}, ${
      record.label
    }`,
  }));

  const deleteRecord = async id => {
    if (!window.confirm('You sure?')) {
      return;
    }
    console.log('delete ', id);
    const url = `${Constants.REST_ENDPOINT}record/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      if (response.ok) {
        alert('Deleted ', id);
        await onUpdate();
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      {showAll ? (
        <Button title="Delete" onPress={() => deleteRecord(id)} />
      ) : (
        <Fragment />
      )}
    </View>
  );

  return (
    <Fragment>
      <View>
        <Text>Show All</Text>
        <Switch
          onValueChange={value => {
            setShowAll(value);
          }}
          value={showAll}
        />
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} id={item.id} />}
          keyExtractor={item => item.id}
        />
      </View>
    </Fragment>
  );
};

export default RecordList;
