import React, { useState, useEffect, useRef } from 'react';
import D3BarChart from './D3BarChart';

const ChartWrapper = ({ gender }) => {
  const myChart = useRef();
  const chart = new D3BarChart(myChart);

  useEffect(() => {
    myChart.update(gender);
  });

  return <div ref={myChart}></div>;
};

export default ChartWrapper;
