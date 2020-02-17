import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';
import { Button, Segment } from 'semantic-ui-react';

const BarChartResponsive = () => {
  const colors = ['#99c2ff', '#4d94ff', '#0066ff', '#0047b3'];
  const origData = [18, 20, 90, 70, 30, 50];
  const [data, setData] = useState(origData);

  const svgBarResRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgBarResRef.current);

    if (!dimensions) return;

    const colorScale = scaleLinear()
      .domain([200, 150, 100, 50])
      .range(colors.reverse(c => c))
      .clamp(true);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, dimensions.width]) //change
      .padding(0.5);

    //yAxis
    const yScale = scaleLinear()
      .domain([200, 0]) //todo
      .range([0, dimensions.height]); //change

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (v, i) => xScale(i))
      .attr('width', xScale.bandwidth())
      .style('transform', 'scale(1, -1')
      .attr('y', -dimensions.height)
      .on('mouseenter', (v, i) => {
        svg
          .selectAll('.d3tooltip')
          .data([v])
          .join(enter => enter.append('text').attr('y', yScale(v) - 4))
          .attr('class', 'd3tooltip')
          .text(v)
          .attr('x', xScale(i) + xScale.bandwidth() / 2)
          .transition()
          .attr('y', yScale(v) - 8)
          .attr('opacity', 1)
          .attr('text-anchor', 'middle');
      })
      .on('mouseleave', () => svg.select('.d3tooltip').remove())
      .transition()
      .duration(300)
      .attr('height', v => dimensions.height - yScale(v))
      .attr('fill', colorScale);
  }, [data, colors, dimensions]);
  return (
    <React.Fragment>
      <Segment>Data: [{data.map(e => `${e}, `)}]</Segment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg className="d3-overflow d3-responsive" ref={svgBarResRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div>
        <Button
          size="tiny"
          as="a"
          primary
          tabIndex="0"
          onClick={() =>
            setData(data.map(v => Math.floor(Math.random() * Math.floor(200))))
          }
        >
          Update Data
        </Button>
        <Button
          size="tiny"
          as="a"
          primary
          tabIndex="1"
          onClick={() =>
            setData([...data, Math.floor(Math.random() * Math.floor(200))])
          }
        >
          Add Data
        </Button>
        <Button
          size="tiny"
          as="a"
          primary
          tabIndex="2"
          onClick={() => setData(origData)}
        >
          Restore Data
        </Button>
      </div>
    </React.Fragment>
  );
};

export default BarChartResponsive;
