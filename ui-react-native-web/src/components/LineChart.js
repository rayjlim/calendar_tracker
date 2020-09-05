import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    console.log(this.state.chartData.datasets);
    var s1 = {
      label: 'Weight',
      borderColor: 'blue',
      pointRadius: 2,
      data: this.state.chartData
    };
    
    // var s2 = {
    //   label: 's2',
    //   borderColor: 'red',
    //   data: [
    //     { x: '2017-01-07 18:00:00', y: 90 },
    //     { x: '2017-01-08 18:00:00', y: 105 },
    //   ]
    // };

    return (
      <div className="chart">
        <Line data={

{ datasets: [s1] }
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
        

      </div>
    )
  }
}

export default Chart;
