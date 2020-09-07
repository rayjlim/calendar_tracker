import React, { Fragment } from "react";
import { AppRegistry, StyleSheet, View, ActivityIndicator } from "react-native";
import Home from "./home";
import Header from "./header";
import Chart from "./components/LineChart";
import Metrics from "./components/Metrics";
import moment from "moment";

import Constants from "./constants";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      chartData: [],
      trendData: [],
      metrics: {},
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
        const records = results.data.map((record) => ({
          x: record.date,
          y: record.count,
        }));
        const metrics = this.calculateMetrics(records);

        //moving average
        let movingAverageSize = 10;
        let trendData = [];
        for (let i = 0; i < records.length; i++) {
          let currentSet = records.slice(i - movingAverageSize+1, i+1);
          let currentSetAverage =
            i <= movingAverageSize
              ? metrics.overallAvg
              : this.average(currentSet.map((record) => parseFloat(record.y)));
          console.log(currentSet, records[i].x);
          trendData.push({
            y: currentSetAverage,
            x: records[i].x,
          });
        }

        this.setState({
          chartData: records,
          trendData,
          metrics,
          loading: false,
        });
      } else {
        console.log("Network response was not ok.");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  calculateMetrics(records) {
    let today = moment();
    let oneWeekAgo = moment().subtract(7, "days");
    let twoWeekAgo = moment().subtract(14, "days");
    let oneMonthAgo = moment().subtract(1, "month");

    var currentWeek = records.filter((item) => {
      let curr = moment(item.x);
      return curr >= oneWeekAgo && curr <= today;
    });

    var pastWeek = records.filter((item) => {
      let curr = moment(item.x);
      return curr >= twoWeekAgo && curr <= oneWeekAgo;
    });

    var restOfMonth = records.filter((item) => {
      let curr = moment(item.x);
      return curr >= oneMonthAgo && curr <= twoWeekAgo;
    });
    let overallAvg = this.average(
      records.map((record) => parseFloat(record.y))
    );
    let currentWeekAvg = this.average(
      currentWeek.map((record) => parseFloat(record.y))
    );
    let pastCurrentWeekAvg = this.average(
      pastWeek.map((record) => parseFloat(record.y))
    );
    let restOfMonthAvg = this.average(
      restOfMonth.map((record) => parseFloat(record.y))
    );

    let highest = records.reduce((agg, record) => {
      return agg === null || record.y > agg.y ? record : agg;
    }, null);

    let lowest = records.reduce((agg, record) => {
      return agg === null || record.y < agg.y ? record : agg;
    }, null);
    return {
      overallAvg,
      currentWeekAvg,
      pastCurrentWeekAvg,
      restOfMonthAvg,
      highest,
      lowest,
    };
  }
  average(group) {
    if (!group) {
      return null;
    }
    let sum = group.reduce((a, b) => a + b, 0);
    return (sum / group.length).toFixed(3);
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
          <Fragment>
            <Metrics data={this.state.metrics} />
            <Chart
              chartData={this.state.chartData}
              trendData={this.state.trendData}
            />
          </Fragment>
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
