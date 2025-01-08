import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Switch,
  FlatList,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { parse, format } from 'date-fns';

import RecordItem from './RecordItem';

import 'react-toastify/dist/ReactToastify.css';

const FULL_DATE_FORMAT = 'yyyy-MM-dd';
const DATE_WITH_DAY = 'yyyy-MM-dd (EEE)';

const RecordList = ({ records, onUpdate }) => {
  const [showAll, setShowAll] = useState(false);

  const today = format(new Date(), FULL_DATE_FORMAT);

  const displayRecords = showAll
    ? [...records].reverse()
    : records.filter(record => record.x === today);

  const DATA = displayRecords.map(record => {
    const date = format(
      parse(record.x, FULL_DATE_FORMAT, new Date()),
      DATE_WITH_DAY,
    );
    return {
      id: record.id,
      title: `${date}, ${record.y} : ${record.label}`,
    };
  });

  const styling = {
    marginTop: '0',
    marginBottom: '0',
    margin: 'auto',
  };

  return (
    <>
      <View style={styling}>
        <Text>Show All</Text>
        <Switch onValueChange={value => setShowAll(value)} value={showAll} />
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) =>
            // eslint-disable-next-line implicit-arrow-linebreak, react/jsx-wrap-multilines
            <RecordItem
              title={item.title}
              id={item.id}
              showDelete={showAll}
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
