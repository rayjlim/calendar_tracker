import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Text,
  View,
  StyleSheet,
  Button,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';
import { REST_ENDPOINT } from '../constants';

const styles = StyleSheet.create({
  title: {
    marginTop: '0',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '0',
  },
  item: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '.25rem',
  },
});

const RecordItem = ({
  title,
  id,
  showDelete,
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
        cache: 'no-cache',
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
      {showDelete && <Button title="Delete" onPress={() => deleteRecord(id)} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default RecordItem;

RecordItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showDelete: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
