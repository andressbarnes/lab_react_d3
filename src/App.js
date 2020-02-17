import React, { Component } from 'react';
import BasicCircles from './components/BasicCircles';
import LineChart from './components/LineChart';
import AxesScales from './components/AxesScales';
import BarChart from './components/BarChart';
import BarChartResponsive from './components/BarChartResponsive';
import BBTimeline from './components/BBTimeline';
import { Container, Grid, Header, Button } from 'semantic-ui-react';

class App extends Component {
  state = {
    gender: 'male',
    data: [
      { age: '10', name: 'Tony' },
      { age: '12', name: 'Jessica' },
      { age: '9', name: 'Andrew' },
      { age: '10', name: 'Emily' },
      { age: '11', name: 'Richard' }
    ]
  };

  updateGender = gender => {
    if (gender === 'women') {
      this.setState({ data: [{ age: '20', name: 'Andy' }] });
    } else {
      this.setState({
        data: [
          { age: '10', name: 'Tony' },
          { age: '12', name: 'Jessica' },
          { age: '9', name: 'Andrew' },
          { age: '10', name: 'Emily' },
          { age: '11', name: 'Richard' }
        ]
      });
    }
  };

  render() {
    return (
      <Grid container style={{ padding: '5em 0em' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" dividing>
              ReactJS + D3 Examples
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="mb">
            <h3>Colorized Animated Bar Chart</h3>
            <BarChart />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="mb">
            <h3>Colorized Animated Bar Chart - Responsive</h3>
            <BarChartResponsive />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="mb">
            <h3>Basic Circles</h3>
            <BasicCircles />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="mb">
            <h3>Basic Lines</h3>
            <LineChart />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="mb">
            <h3>Axes and Scales</h3>
            <AxesScales />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
