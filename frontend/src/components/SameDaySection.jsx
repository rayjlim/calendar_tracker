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

  const getSameDayData = (selectedDate = '') => {
    // console.log(REST_ENDPOINT);
    (async () => {
      let url = `${REST_ENDPOINT}/onThisDay/`;
      if (selectedDate) {
        const date = new Date(selectedDate);
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate() + 1;
        url = `${REST_ENDPOINT}/onThisDay/?month=${month}&day=${day}`;
      }
      try {
        const response = await fetch(url, {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const results = await response.json();
          // // console.log(`years list response: ${results}`);

          setYearsList([...results]);
        } else {
          throw new Error('Network response was not ok.');
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

  // console.log(yearsList);

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
            <h3>Same Day section</h3>
            <form>
              <div>
                <label htmlFor="sameDayDate">
                  Select Date:
                  <input
                    type="date"
                    id="sameDayDate"
                    name="sameDayDate"
                    onChange={e => {
                      const selectedDate = e.target.value;
                      // console.log(selectedDate);
                      getSameDayData(selectedDate);
                    }}
                  />
                </label>
              </div>
            </form>
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
