import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';

const BasicCircles = () => {
  const origData = [18, 20, 13, 39, 27];
  const [data, setData] = useState([18, 20, 13, 39, 27]);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
        enter =>
          enter
            .append('circle')
            .attr('class', 'new')
            .attr('cx', (v, i) => (200 / 2) * i)
            .attr('cy', 100),
        update => update.attr('class', 'updated'),
        exit =>
          exit
            .transition()
            .duration(500)
            .attr('r', 0)
            .remove()
      )
      //dry up code from repeating in enter and update
      .attr('cx', (v, i) => (200 / 2) * i)
      .attr('cy', 100)
      .attr('stroke', 'yellow')
      .attr('fill', 'green')
      .transition()
      .duration(500)
      .attr('r', v => v * 2);
  }, [data]);
  return (
    <React.Fragment>
      <div>Data: [{data.map(e => `${e},`)}]</div>
      <svg className="d3-component" width="500" height="200" ref={svgRef}></svg>
      <div>
        <button onClick={() => setData(data.map(v => v + 5))}>
          Update Data
        </button>
        <button onClick={() => setData(data.filter(v => v < 35))}>
          {`Filter Data < 35`}
        </button>
        <button onClick={() => setData(origData)}>Restore Data</button>
      </div>
    </React.Fragment>
  );
};

export default BasicCircles;
