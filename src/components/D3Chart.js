import * as d3 from 'd3'; //TODO refine import later

const data = [20, 12, 16, 5, 30];

export default class D3Chart {
  constructor(element) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    const rects = svg.selectAll('rect').data(data);

    rects
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', 50)
      .attr('width', 20)
      .attr('height', d => 100 + d)
      .attr('fill', 'grey');
  }
}
