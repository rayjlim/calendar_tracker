import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import UserList from "./user-list";
import RecordForm from "./record-form";

class Home extends React.Component {
  state = {
    users: [],
    loading: true,
    status: 'up'
  };
  componentDidMount() {

  }



  render() {
    return (
      <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
        <RecordForm />
{/* 
        {this.state.loading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
          <UserList users={this.state.users} />
        )} */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke"
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default Home;
