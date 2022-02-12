import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import UserList from "./user-list";
import RecordForm from "./record-form";

class Home extends React.Component {
  state = {
    users: [],
    loading: true,
    status: "up",
  };
  componentDidMount() {}

  render() {
    return (
      <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
        <RecordForm />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
  },
});

export default Home;
