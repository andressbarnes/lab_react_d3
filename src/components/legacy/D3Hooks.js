import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

//SET SVG BOUNDS
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

/* Component */
const D3Hooks = props => {
  console.log(props);
  const d3Container = useRef(null);

  //chart stage (will not change)
  useEffect(() => {
    const svg = d3
      .select(d3Container.current)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`);
  });

  useEffect(() => {
    const svg = d3.select(d3Container.current);
    const rects = svg.selectAll('rect').data(props.data);

    //ENTER
    rects
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50 + 800 / 5)
      .attr('y', 50)
      .attr('width', 40)
      .transition()
      .duration(500)
      .attr('height', d => 100 + d.age * 4)
      .attr('fill', d => {
        return d.age > 10 ? 'red' : 'green';
      });

    //EXIT
    rects
      .exit()
      .transition()
      .duration(500)
      .attr('y', HEIGHT)
      .attr('height', 0)
      .remove()
      .attr('fill', 'transparent');

    //UPDATE
    rects
      .transition()
      .duration(500)
      .attr('fill', d => {
        return props.gender === 'men' ? 'blue' : 'red';
      });
  }, [props]);

  return (
    <svg
      className="d3-component"
      width={WIDTH}
      height={HEIGHT}
      ref={d3Container}
    />
  );
};

export default D3Hooks;
