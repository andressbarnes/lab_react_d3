import * as d3 from 'd3'; //TODO refine import later

const url1 = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const url2 = 'https://udemy-react-d3.firebaseio.com/tallest_women.json';
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3BarChart {
  constructor(element) {
    const vis = this;
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle');

    vis.svg
      .append('text')
      .attr('x', -HEIGHT / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(${-90})`)
      .text(`Height in cm`);

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle');

    vis.yAxisGroup = vis.svg.append('g');

    Promise.all([d3.json(url1), d3.json(url2)]).then(datasets => {
      vis.menData = datasets[0];
      vis.womenData = datasets[1];
      vis.update('men');
    });
  }

  update(gender) {
    //call when data is changed
    const vis = this;
    vis.data = gender === 'men' ? vis.menData : vis.womenData;
    vis.xLabel.text(`The world's tallest ${gender}`);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, d => d.height) * 0.95,
        d3.max(vis.data, d => d.height)
      ])
      .range([HEIGHT, 0]);

    const xScale = d3
      .scaleBand()
      .domain(vis.data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.5);

    //add x axis
    const xAxisCall = d3.axisBottom(xScale);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);

    //add y axis
    const yAxisCall = d3.axisLeft(yScale);
    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);

    //DATA JOIN
    const rects = vis.svg.selectAll('rect').data(vis.data);

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
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.height))
      .attr('width', xScale.bandwidth)
      .attr('height', d => HEIGHT - yScale(d.height))
      .attr('fill', d => {
        return gender === 'men' ? 'blue' : 'red';
      });

    //ENTER
    rects
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.name))
      .attr('width', xScale.bandwidth)

      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.height))
      .attr('height', d => HEIGHT - yScale(d.height))
      .attr('fill', d => {
        return gender === 'men' ? 'blue' : 'red';
      });
  }
}

export default D3BarChart;
