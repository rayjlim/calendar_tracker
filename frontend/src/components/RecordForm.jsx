import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, sub } from 'date-fns';
import DatePicker from 'react-date-picker';
import {
  Text,
  TextInput,
  Button,
  View,
  TouchableHighlight,
  StyleSheet,
// eslint-disable-next-line import/no-unresolved
} from 'react-native';
import Constants from '../constants';

const FULL_DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_COUNT = 140.0;

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  actionButton: {
    padding: 10,
    color: 'white',
    borderRadius: 6,
    width: 80,
    backgroundColor: '#808080',
    marginRight: 5,
    marginLeft: 5,
  },
  defaultButton: {
    width: '98%',
  },
  actionButtonDestructive: {
    backgroundColor: '#ff4b21',
  },
  actionButtonText: {
    textAlign: 'center',
  },
  countInput: {
    width: '7em',
    backgroundColor: '#FFF',
    border: '1px solid #EEE',
  },
  commentInput: {
    width: '25em',
    backgroundColor: '#FFF',
    border: '1px solid #EEE',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    // height: "100vh",
    // flexDirection: "row",
    // flex: 1,
    // order: 2,
  },
});
const HIGHEST_WEIGHT = 175;
const LOWEST_WEIGHT = 115;

const RecordForm = ({ onUpdate }) => {
  const [recordDate, setRecordDate] = useState(new Date());
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [comment, setComment] = useState('');

  const calendarCheck = () => {
    if (recordDate === null) {
      setRecordDate(new Date());
    }
  };

  async function sendRecord() {
    console.log('sendRecord');

    if (count > HIGHEST_WEIGHT || count < LOWEST_WEIGHT) {
      // magic numbers
      alert('Invalid number - not within range');
      return;
    }
    const data = {
      date: format(recordDate, FULL_DATE_FORMAT, new Date()),
      count,
      comment,
      goal: 'weight',
    };
    const url = `${Constants.REST_ENDPOINT}record/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      console.log(response);
      if (response.ok) {
        alert('Save Complete');
        await onUpdate();

        // reset values
        setRecordDate(new Date());
        setCount(DEFAULT_COUNT);
        setComment('');
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <View style={styles.centering}>
      <TouchableHighlight
        style={[
          styles.actionButton,
          styles.actionButtonDestructive,
          styles.defaultButton,
        ]}
        onPress={() => {
          setCount(DEFAULT_COUNT);
        }}
      >
        <Text style={styles.actionButtonText}>
          Default:
          {' '}
          {DEFAULT_COUNT}
        </Text>
      </TouchableHighlight>

      <View style={styles.actionsContainer}>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = -0.2;
            const updated = +(count + factor).toFixed(2);
            setCount(updated);
          }}
        >
          <Text style={styles.actionButtonText}>-.2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = -1.0;
            const updated = +(count + factor).toFixed(2);
            setCount(updated);
          }}
        >
          <Text style={styles.actionButtonText}>-1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = 1.0;
            const updated = +(count + factor).toFixed(2);
            setCount(updated);
          }}
        >
          <Text style={styles.actionButtonText}>+1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = 0.2;
            const updated = +(count + factor).toFixed(2);
            setCount(updated);
          }}
        >
          <Text style={styles.actionButtonText}> +.2</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Track</Text>

        <select
          className="form-control form-control-sm"
          name="goal"
          id="goalEntry"
        >
          <option>weight</option>
        </select>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Count: </Text>

        <TextInput
          style={styles.countInput}
          type="text"
          keyboardType="numeric"
          value={count}
          onChangeText={setCount}
          placeholder="Count"
        />
      </View>
      <View>
        <Text style={styles.actionButtonText}>Comment</Text>
        <TextInput
          style={styles.commentInput}
          type="text"
          value={comment}
          onChangeText={setComment}
          placeholder="comment"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            sendRecord();
          }}
          title="Submit"
        />
      </View>
      <View style={styles.actionsContainer}>
        <Text>Date: </Text>
        <DatePicker
          onChange={setRecordDate}
          value={recordDate}
          onCalendarClose={calendarCheck}
        />
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            setRecordDate(sub(recordDate, { days: 1 }));
          }}
        >
          <Text style={styles.actionButtonText}>-1</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default RecordForm;

RecordForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};