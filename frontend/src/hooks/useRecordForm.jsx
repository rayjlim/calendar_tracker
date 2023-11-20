import { useState, useRef } from 'react';
import { format, add } from 'date-fns';
import { toast } from 'react-toastify';

import {
  DEFAULT_COUNT,
  GOAL_KEY,
  STORAGE_KEY,
  HIGHEST_WEIGHT,
  LOWEST_WEIGHT,
  FULL_DATE_FORMAT,
  REST_ENDPOINT,
} from '../constants';

const useRecordForm = onUpdate => {
  const [recordDate, setRecordDate] = useState(format(new Date(), FULL_DATE_FORMAT));
  // eslint-disable-next-line max-len
  const [countDefault, setCountDefault] = useState(parseFloat(window.localStorage.getItem(STORAGE_KEY) || DEFAULT_COUNT));
  const countRef = useRef(countDefault);
  const commentRef = useRef('');
  const saveToLocalRef = useRef(false);
  const [isSending, setIsSending] = useState(false);

  const changeDate = event => {
    console.log(event.target.value);
    const newdate = event.target.value
      ? format(add(new Date(event.target.value), { days: 1 }), FULL_DATE_FORMAT)
      : format(new Date(), FULL_DATE_FORMAT);
    setRecordDate(newdate);
  };

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
      date: recordDate,
      count: countRef.current.value,
      comment: commentRef.current.value,
      goal: 'weight',
    };
    const url = `${REST_ENDPOINT}/record/`;
    try {
      setIsSending(true);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      if (response.ok) {
        toast.success('Save Complete');
        await onUpdate();

        // reset values
        setRecordDate(format(new Date(), FULL_DATE_FORMAT));
        countRef.current.value = countDefault;
        commentRef.current.value = '';
      } else {
        console.log('Network response was not ok.');
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }

    setIsSending(false);
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
      setCountDefault(newValue);
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
  return {
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
  };
};
export default useRecordForm;
