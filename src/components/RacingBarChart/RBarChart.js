import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver';

const BarChartResponsive = ({ start, data }) => {
  const rBarRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!start) return;

    const svg = select(rBarRef.current);
    if (!dimensions) return;

    data.sort((a, b) => b.value - a.value);

    //xScale
    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.value)])
      .range([0, dimensions.width]);

    //yScale
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((v, i) => i))
      .range([0, dimensions.height]);

    svg
      .selectAll('.bar')
      .data(data, (entry, i) => entry.name)
      .join(enter => enter.append('rect').attr('y', (entry, i) => yScale(i)))
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .attr('fill', entry => entry.color)
      .transition()
      .attr('width', entry => xScale(entry.value))
      .attr('y', (entry, i) => yScale(i));

    // draw the labels
    svg
      .selectAll('.label')
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter
          .append('text')
          .attr(
            'y',
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `${entry.name} (${entry.value} meters)`)
      .attr('class', 'label')
      .attr('fill', 'white')
      .attr('x', 10)
      .transition()
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [start, data, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg className="d3-overflow d3-responsive" ref={rBarRef}></svg>
      </div>
    </React.Fragment>
  );
};

export default BarChartResponsive;
