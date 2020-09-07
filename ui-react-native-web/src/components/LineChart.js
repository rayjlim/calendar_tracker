import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      trendData: props.trendData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  render() {
    console.log(this.state.chartData);
    var s1 = {
      label: "Weight",
      borderColor: "blue",
      pointRadius: 2,
      data: this.state.chartData,
    };

    var s2 = {
      label: "Trend",
      borderColor: "red",
      fill: "none",
      data: this.state.trendData,
    };

    return (
      <div className="chart">
        <Line
          data={{ datasets: [s1, s2] }}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time",
                },
              ],
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "index",
              intersect: false,
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
