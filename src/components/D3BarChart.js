import * as d3 from 'd3'; //TODO refine import later

const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3BarChart {
  constructor(element) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    d3.json(url).then(data => {
      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, d => d.height) * 0.95,
          d3.max(data, d => d.height)
        ])
        .range([HEIGHT, 0]);

      const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.name))
        .range([0, WIDTH])
        .padding(0.5);

      //add x axis
      const xAxisCall = d3.axisBottom(xScale);
      svg
        .append('g')
        .attr('transform', `translate(0, ${HEIGHT})`)
        .call(xAxisCall);

      svg
        .append('text')
        .attr('x', WIDTH / 2)
        .attr('y', HEIGHT + 50)
        .attr('text-anchor', 'middle')
        .text(`The world's tallest men`);

      svg
        .append('text')
        .attr('x', -HEIGHT / 2)
        .attr('y', -50)
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(${-90})`)
        .text(`Height in cm`);

      //add y axis
      const yAxisCall = d3.axisLeft(yScale);
      svg.append('g').call(yAxisCall);

      const rects = svg.selectAll('rect').data(data);

      rects
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.height))
        .attr('width', xScale.bandwidth)
        .attr('height', d => HEIGHT - yScale(d.height))
        .attr('fill', d => {
          return d.height > 270 ? 'red' : 'green';
        });
    });
  }
}

export default D3BarChart;
