import React, { Component } from 'react';
import D3BarChart from './D3BarChart';

class ChartWrapper extends Component {
  componentDidMount() {
    new D3BarChart(this.refs.chart);
  }
  render() {
    return <div ref="chart"></div>;
  }
}

export default ChartWrapper;
