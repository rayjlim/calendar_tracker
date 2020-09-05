import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    var s1 = {
      label: 's1',
      borderColor: 'blue',
      data: [
        { x: '2017-01-06 18:39:30', y: 100 },
        { x: '2017-01-07 18:39:28', y: 101 },
      ]
    };
    
    var s2 = {
      label: 's2',
      borderColor: 'red',
      data: [
        { x: '2017-01-07 18:00:00', y: 90 },
        { x: '2017-01-08 18:00:00', y: 105 },
      ]
    };

    return (
      <div className="chart">
        <Line data={

{ datasets: [s1, s2] }
        }

options={ {
  scales: {
    xAxes: [{
      type: 'time'
    }]
  }
}
}/>
        }
        <Line
          data={
            {
              labels: [
                new Date("2015-3-15 13:3").toLocaleString(),
               new Date("2015-3-25 13:2").toLocaleString(), 
               new Date("2020-4-25 14:12").toLocaleString()],
              datasets: [{
                label: 'Trend graph',
                data: [{
                    t: new Date("2015-3-15 13:3"),
                    y: 12
                  },
                  {
                    t: new Date("2016-3-25 13:2"),
                    y: 21
                  },
                  {
                    t: new Date("2017-3-25 13:2"),
                    y: 11
                  },
                  {
                    t: new Date("2018-3-25 13:2"),
                    y: 25
                  },
                  {
                    t: new Date("2018-9-25 13:2"),
                    y: 3
                  },
                  {
                    t: new Date("2020-4-25 14:12"),
                    y: 32
                  }
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            }

          }
          options={
            {
              scales: {
                  xAxes: [{
                      type: 'time',
                      time: {
                          unit: 'year'
                      }
                  }]
              }
          }
          }
        />

      </div>
    )
  }
}

export default Chart;
