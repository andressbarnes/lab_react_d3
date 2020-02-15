import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';

const BarChart = () => {
  const colors = ['#99c2ff', '#4d94ff', '#0066ff', '#0047b3'];
  const origData = [18, 20, 90, 70, 30, 50];
  const [data, setData] = useState(origData);

  const svgBarRef = useRef();
  useEffect(() => {
    const svg = select(svgBarRef.current);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, 500])
      .padding(0.5);

    const colorScale = scaleLinear()
      .domain([200, 150, 100, 50])
      .range(colors.reverse(c => c))
      .clamp(true);

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

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (v, i) => xScale(i))
      .attr('width', xScale.bandwidth())
      .style('transform', 'scale(1, -1')
      .attr('y', -200)
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
      .attr('height', v => 200 - yScale(v))
      .attr('fill', colorScale);
  }, [data, colors]);
  return (
    <React.Fragment>
      <div>Data: [{data.map(e => `${e},`)}]</div>
      <svg className="d3-overflow" width="500" height="200" ref={svgBarRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div>
        <button
          onClick={() =>
            setData(data.map(v => Math.floor(Math.random() * Math.floor(200))))
          }
        >
          Update Data
        </button>
        <button
          onClick={() =>
            setData([...data, Math.floor(Math.random() * Math.floor(200))])
          }
        >
          Add Data
        </button>
      </div>
    </React.Fragment>
  );
};

export default BarChart;
