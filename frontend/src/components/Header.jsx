import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
// eslint-disable-next-line import/no-unresolved
} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ff4e3f',
    backgroundColor: '#ff8179',
  },
  header: {
    padding: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    minHeight: 50,
    margin: '0.5em',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
  },
});

const Header = ({ title }) => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.header}>
      <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
        {title}
      </Text>
    </View>
  </SafeAreaView>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
