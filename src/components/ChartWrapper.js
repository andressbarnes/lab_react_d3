import React, { Component } from 'react';
import D3BarChart from './D3BarChart';

class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3BarChart(this.refs.chart)
    });
  }

  //ignore reacts normal updates and
  //stop component from being rerendered
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default ChartWrapper;
