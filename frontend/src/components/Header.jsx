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
    padding: '.5rem',
    flexDirection: 'row',
    minHeight: 40,
    margin: '0',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
  },
  subtitle: {
    fontSize: '.8rem',
    fontWeight: '500',
    textAlign: 'right',
    color: 'black',
    margin: '0',
  },
});

const Header = ({ title, subtitle }) => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.header}>
      <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
        {title}
      </Text>
      <Text accessibilityRole="heading" aria-level="5" style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  </SafeAreaView>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
