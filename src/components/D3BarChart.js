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
      .attr('text-anchor', 'middle')
      .text(`The world's tallest men`);

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

    vis.yAxisGroup = vis.svg.append('g');

    Promise.all([d3.json(url1), d3.json(url2)]).then(datasets => {
      const [men, women] = datasets;
      let flag = true;
      vis.data = men;
      vis.update();
      d3.interval(() => {
        vis.data = flag ? men : women;
        vis.update();
        flag = !flag;
      }, 2000);
    });
  }

  update() {
    //call when data is changed
    const vis = this;
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
      .remove();

    //UPDATE
    rects
      .transition()
      .duration(500)
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.height))
      .attr('width', xScale.bandwidth)
      .attr('height', d => HEIGHT - yScale(d.height));

    //ENTER
    rects
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.name))
      .attr('width', xScale.bandwidth)
      .attr('fill', d => {
        return d.height > 270 ? 'red' : 'green';
      })
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.height))
      .attr('height', d => HEIGHT - yScale(d.height));
  }
}

export default D3BarChart;
