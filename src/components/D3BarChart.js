import * as d3 from 'd3'; //TODO refine import later

const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';

class D3BarChart {
  constructor(element) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', 800)
      .attr('height', 500);

    d3.json(url).then(response => {
      const rects = svg.selectAll('rect').data(response);

      rects
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 70)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', d => d.height)
        .attr('fill', d => {
          return d.height > 270 ? 'red' : 'green';
        });
    });
  }
}

export default D3BarChart;
