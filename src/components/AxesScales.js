import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear
} from 'd3';
import { Segment, Button } from 'semantic-ui-react';

const AxesScales = () => {
  const origData = [18, 20, 90, 70, 30, 50];
  const [data, setData] = useState(origData);
  const svgLineRef = useRef();
  useEffect(() => {
    const svg = select(svgLineRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 500]);

    //yAxis
    const yScale = scaleLinear()
      .domain([200, 0])
      .range([0, 200]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(200px)')
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', 'translateX(500px)')
      .call(yAxis);

    const myLine = line()
      .x((v, i) => xScale(i))
      .y(v => yScale(v))
      .curve(curveCardinal);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .transition()
      .duration(500)
      .attr('d', v => myLine(v))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);
  return (
    <React.Fragment>
      <Segment>Data: [{data.map(e => `${e},`)}]</Segment>
      <svg className="d3-overflow mb" width="500" height="200" ref={svgLineRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div>
        <Button
          size="tiny"
          as="a"
          primary
          onClick={() =>
            setData(data.map(v => Math.floor(Math.random() * Math.floor(200))))
          }
        >
          Update Data
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AxesScales;
