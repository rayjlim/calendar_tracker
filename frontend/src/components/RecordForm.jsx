import React, { useState, useRef } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';

import {
  DEFAULT_COUNT,
  GOAL_KEY,
  STORAGE_KEY,
  HIGHEST_WEIGHT,
  LOWEST_WEIGHT,
  FULL_DATE_FORMAT,
  REST_ENDPOINT,
} from '../constants';

import 'react-toastify/dist/ReactToastify.css';

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
  },
});

const RecordForm = ({ onUpdate }) => {
  const [recordDate, setRecordDate] = useState(new Date());
  // eslint-disable-next-line max-len
  const countDefault = parseFloat(window.localStorage.getItem(STORAGE_KEY) || DEFAULT_COUNT);
  const countRef = useRef(countDefault);
  const commentRef = useRef('');
  const saveToLocalRef = useRef(false);
  const [sendingRecord, setSendingRecord] = useState(false);

  const calendarCheck = () => {
    if (recordDate === null) {
      setRecordDate(new Date());
    }
  };
  // function wait(timeout) {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, timeout);
  //   });
  // }
  async function sendRecord() {
    console.log('sendRecord', countRef.current.value);

    if (countRef.current.value > HIGHEST_WEIGHT
      || countRef.current.value < LOWEST_WEIGHT) {
      toast.error('Invalid number - not within range');
      return;
    }

    if (saveToLocalRef.current) {
      window.localStorage.setItem(STORAGE_KEY, countRef.current.value);
      toast.success('Saved to local storage');
      saveToLocalRef.current = false;
      return;
    }

    const data = {
      date: format(recordDate, FULL_DATE_FORMAT, new Date()),
      count: countRef.current.value,
      comment: commentRef.current.value,
      goal: 'weight',
    };
    const url = `${REST_ENDPOINT}record/`;
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
        toast.success('Save Complete');
        await onUpdate();

        // reset values
        setRecordDate(new Date());
        countRef.current.value = countDefault;
        commentRef.current.value = '';
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
    setSendingRecord(false);
  }

  const addFactorToCount = factor => {
    const updated = +(parseFloat(countRef.current.value) + factor).toFixed(2);
    countRef.current.value = updated;
  };

  const DECIMAL_REGEX = /^-?\d*(\.\d+)?$/;
  function saveDefault() {
    const newValue = countRef.current.value;
    if (newValue.match(DECIMAL_REGEX)) {
      window.localStorage.setItem(STORAGE_KEY, newValue);
      toast.success('Saved default', {
        autoClose: 500,
      });
      return;
    }
    toast.error('Default: Invalid number');
  }

  async function saveGoal() {
    const newValue = countRef.current.value;
    if (newValue.match(DECIMAL_REGEX) || newValue === '') {
      window.localStorage.setItem(GOAL_KEY, newValue);
      toast.success('Saved Goal', {
        autoClose: 500,
      });
      await onUpdate();
      return;
    }
    toast.error('Goal: Invalid number');
  }

  return (
    <View style={styles.centering}>
      <div>
        <ToastContainer />
      </div>
      <TouchableHighlight
        style={[
          styles.actionButton,
          styles.actionButtonDestructive,
          styles.defaultButton,
        ]}
        onPress={() => {
          countRef.current.value = countDefault;
          setRecordDate(new Date());
        }}
      >
        <Text style={styles.actionButtonText}>
          Default:
          {' '}
          {countDefault}
        </Text>
      </TouchableHighlight>

      <View style={styles.actionsContainer}>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = -0.2;
            addFactorToCount(factor);
          }}
        >
          <Text style={styles.actionButtonText}>-.2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = -1.0;
            addFactorToCount(factor);
          }}
        >
          <Text style={styles.actionButtonText}>-1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = 1.0;
            addFactorToCount(factor);
          }}
        >
          <Text style={styles.actionButtonText}>+1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            const factor = 0.2;
            addFactorToCount(factor);
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
        <Button
          onPress={() => {
            saveDefault();
          }}
          title="Default"
        />
        <Button
          onPress={() => {
            saveGoal();
          }}
          title="Goal"
        />
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Count: </Text>
        <TextInput
          style={styles.countInput}
          type="text"
          keyboardType="numeric"
          ref={countRef}
          defaultValue={countDefault}
        />
      </View>
      <View>
        <Text style={styles.actionButtonText}>Comment</Text>
        <TextInput
          style={styles.commentInput}
          type="text"
          ref={commentRef}
          placeholder="Enter comment"
        />
      </View>
      <View>
        {sendingRecord ? (
          <Button disabled="true" title="Sending Record" />
        ) : (
          <Button
            onPress={() => {
              sendRecord();
            }}
            title="Submit"
          />
        )}
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
