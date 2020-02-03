import * as d3 from 'd3'; //TODO refine import later

const url = 'https://udemy-react-d3.firebaseio.com/ages.json';

class D3Chart {
  constructor(element) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    d3.json(url).then(agesData => {
      const rects = svg.selectAll('rect').data(agesData);

      rects
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 50)
        .attr('y', 50)
        .attr('width', 20)
        .attr('height', d => 100 + d.age * 4)
        .attr('fill', d => {
          return d.age > 10 ? 'red' : 'green';
        });
    });
  }
}

export default D3Chart;
