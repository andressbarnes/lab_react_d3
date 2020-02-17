import React, { useRef, useEffect } from 'react';
import { select, min, max, scaleTime, scaleLinear, axisBottom } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver';

const getDate = dateString => {
  const date = dateString.split('-');
  return new Date(date[2], date[0] - 1, date[1]);
};

function BBTimeline({ data, highlight }) {
  const svgBBRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgBBRef.current);
    if (!dimensions) return;

    const minDate = min(data, episode => getDate(episode.air_date));
    const maxDate = max(data, episode => getDate(episode.air_date));

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, dimensions.width]);

    const yScale = scaleLinear()
      .domain([max(data, episode => episode.characters.length), 0])
      .range([0, dimensions.height]);

    svg
      .selectAll('.episode')
      .data(data)
      .join('line')
      .attr('class', 'episode')
      .attr('x1', episode => xScale(getDate(episode.air_date)))
      .attr('y1', dimensions.height)
      .attr('x2', episode => xScale(getDate(episode.air_date)))
      .attr('y2', episode => yScale(episode.characters.length))
      .transition()
      .duration(500)
      .attr('stroke', episode =>
        episode.characters.includes(highlight) ? 'blue' : 'lightblue'
      );

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // draw the gauge
  }, [data, dimensions, highlight]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg className="d3-responsive d3-overflow" ref={svgBBRef}>
        <g className="x-axis" />
      </svg>
    </div>
  );
}

export default BBTimeline;
