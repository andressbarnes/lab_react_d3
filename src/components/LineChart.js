import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal } from 'd3';
import { Segment, Button } from 'semantic-ui-react';

const LineChart = () => {
  const origData = [18, 20, 90, 70, 30, 50];
  const [data, setData] = useState(origData);
  const svgLineRef = useRef();
  useEffect(() => {
    const svg = select(svgLineRef.current);
    const myLine = line()
      .x((v, i) => i * 100)
      .y(v => 200 - v)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .transition()
      .duration(500)
      .attr('d', v => myLine(v))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);
  return (
    <React.Fragment>
      <Segment>Data: [{data.map(e => `${e},`)}]</Segment>
      <svg
        className="d3-component mb"
        width="500"
        height="200"
        ref={svgLineRef}
      ></svg>
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

export default LineChart;
