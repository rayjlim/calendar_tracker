import React, { Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Switch,
} from "react-native";

import AggregateChart from "./components/AggregateChart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showMontly: false,
      showYearly: false,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <View style={styles.appContainer}>
        <View>
          <Text>Show Monthly</Text>
          <Switch
            onValueChange={(value) => {
              this.setState({ showMonthly: value });
            }}
            value={this.state.showMonthly}
          />
          {this.state.showMonthly ? (
             <AggregateChart type="month" />
          ) : (
            <Fragment />
          )}
        </View>
        <View>
          <Text>Show Yearly</Text>
          <Switch
            onValueChange={(value) => {
              this.setState({ showYearly: value });
            }}
            value={this.state.showYearly}
          />
          {this.state.showYearly ? (
             <AggregateChart type="year" />
          ) : (
            <Fragment />
          )}
        </View>
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
