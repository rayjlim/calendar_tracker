import React, { useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Switch,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { REST_ENDPOINT } from '../constants';

const SameDaySection = () => {
  const [showSameDay, setShowSameDay] = useState(false);
  const [yearsList, setYearsList] = useState([]);
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
    },
  });

  const getSameDayData = () => {
    console.log(REST_ENDPOINT);
    (async () => {
      const url = `${REST_ENDPOINT}/onThisDay/`;
      try {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const results = await response.json();
          // console.log(`years list response: ${results}`);

          setYearsList([...results]);
        } else {
          console.log('Network response was not ok.');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    })();
  };

  const trigger = value => {
    setShowSameDay(value);
    getSameDayData();
  };

  console.log(yearsList);

  return (
    <View style={styles.appContainer}>
      <View>
        <Text>Show Same Day</Text>
        <Switch
          onValueChange={value => trigger(value)}
          value={showSameDay}
        />
        {showSameDay && (
          <>
            <span>Same Day section</span>
            <ul>
              {yearsList.map(item => (
                <li key={item.date}>{`${item.date} ${item.count} ${item.comment}`}</li>
              ))}

            </ul>
          </>
        )}
      </View>
    </View>
  );
};

AppRegistry.registerComponent('App', () => SameDaySection);

export default SameDaySection;
