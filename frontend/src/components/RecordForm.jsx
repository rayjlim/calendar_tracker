import React from 'react';
import PropTypes from 'prop-types';
import { format, sub } from 'date-fns';

import {
  Text,
  TextInput,
  Button,
  View,
  TouchableHighlight,
  StyleSheet,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { ToastContainer } from 'react-toastify';

import { FULL_DATE_FORMAT } from '../constants';
import useRecordForm from '../hooks/useRecordForm';

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
  const {
    setRecordDate,
    saveDefault,
    saveGoal,
    countRef,
    countDefault,
    addFactorToCount,
    commentRef,
    isSending,
    sendRecord,
    recordDate,
    changeDate,
  } = useRecordForm(onUpdate);

  return (
    <View style={styles.centering}>
      <ToastContainer />
      <TouchableHighlight
        style={[
          styles.actionButton,
          styles.actionButtonDestructive,
          styles.defaultButton,
        ]}
        onPress={() => {
          countRef.current.value = countDefault;
          setRecordDate(format(new Date(), FULL_DATE_FORMAT));
        }}
      >
        <Text style={styles.actionButtonText}>
          {`Default: ${countDefault}`}
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
        <Button
          disabled={isSending}
          title={isSending ? 'Sending Record...' : 'Submit'}
          onPress={() => sendRecord()}
        />
      </View>
      <View style={styles.actionsContainer}>
        <Text>Date: </Text>
        <input type="date" value={recordDate} onChange={changeDate} />
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() => {
            setRecordDate(format(sub(new Date(recordDate), { days: 0 }), FULL_DATE_FORMAT));
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
