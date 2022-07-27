import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { ScrollView, StyleSheet } from 'react-native';
import RecordForm from './components/RecordForm';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
  },
});
const Home = () => (
  <ScrollView noSpacer noScroll style={styles.container}>
    <RecordForm />
  </ScrollView>
);

export default Home;
