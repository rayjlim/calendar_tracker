import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  StyleSheet,
  Switch,
  FlatList,
  Button,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REST_ENDPOINT } from '../constants';

const FULL_DATE_FORMAT = 'yyyy-MM-dd';
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
});

const Item = ({
  title,
  id,
  showAll,
  onUpdate,
}) => {
  const deleteRecord = async targetId => {
    if (!window.confirm('You sure?')) {
      return;
    }
    console.log('delete ', targetId);
    const url = `${REST_ENDPOINT}/record/${targetId}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      if (response.ok) {
        toast(`Deleted ${targetId}`);
        await onUpdate();
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      {showAll ? (
        <Button title="Delete" onPress={() => deleteRecord(id)} />
      ) : (
        <>
          {' '}
          {' '}
        </>
      )}
    </View>
  );
};
const RecordList = ({ records, onUpdate }) => {
  const [showAll, setShowAll] = useState(false);

  const today = format(new Date(), FULL_DATE_FORMAT);

  const displayRecords = showAll
    ? [...records].reverse()
    : records.filter(record => record.x === today);

  const DATA = displayRecords.map(record => ({
    id: record.id,
    title: `${format(
      parse(record.x, FULL_DATE_FORMAT, new Date()),
      'yyyy-MM-dd (EEE)',
    )}, ${record.y}, ${record.label}`,
  }));

  return (
    <>
      <ToastContainer />
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
          renderItem={({ item }) =>
            // eslint-disable-next-line implicit-arrow-linebreak, react/jsx-wrap-multilines
            <Item
              title={item.title}
              id={item.id}
              showAll={showAll}
              onUpdate={onUpdate}
            />}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default RecordList;

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showAll: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
