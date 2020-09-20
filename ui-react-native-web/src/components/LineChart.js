import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  render() {
    console.log(this.props.chartData);
    var s1 = {
      label: "Weight",
      borderColor: "blue",
      pointRadius: 2,
      data: this.props.chartData,
    };

    var s2 = {
      label: "Trend",
      borderColor: "red",
      fill: "none",
      data: this.props.trendData,
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
