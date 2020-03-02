import React, { Component, useState } from 'react';
import BasicCircles from './components/BasicCircles';
import LineChart from './components/LineChart';
import AxesScales from './components/AxesScales';
import BarChart from './components/BarChart';
import BasicChart from './components/BasicChart';
import BarChartResponsive from './components/BarChartResponsive';
import RaceBarChart from './components/RacingBarChart';
import LineChartZoom from './components/LineChartZoom';
import { Grid, Header, Button } from 'semantic-ui-react';

const App = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <Grid container style={{ padding: '5em 0em' }}>
      <Grid.Row>
        <Grid.Column className="mb">
          <h3>Zoomable Line Chart</h3>
          <BasicChart data={data} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column className="mb">
          <h3>Racing Bar Chart</h3>
          <RaceBarChart />
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
};

export default App;
