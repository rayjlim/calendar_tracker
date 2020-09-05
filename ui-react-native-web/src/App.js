import React from "react";
import { AppRegistry, StyleSheet, View, ActivityIndicator } from "react-native";
import Home from "./home";
import Header from "./header";
import Chart from "./components/LineChart";

import Constants from "./constants";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      chartData: {},
    };
  }
  componentDidMount() {
    this.getChartData();
  }
  async getChartData() {
    // Ajax calls here
    console.log("getChartData");
    const url = `${Constants.REST_ENDPOINT}record/`;
    try {
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      if (response.ok) {
        const results = await response.json();
        console.log(results);
        //map the data
        const records = results.data.map(record => ({ x: record.date, y: record.count }));

        this.setState({
          chartData: {
            datasets: records,
          },
          loading: false,
        });
      } else {
        console.log("Network response was not ok.");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Header title="Tracker 3 app" />
        <Home />

        {this.state.loading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
          <Chart chartData={this.state.chartData.datasets} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent("App", () => App);

export default App;
