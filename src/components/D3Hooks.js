import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

/* Component */
const D3Hooks = props => {
  //const url = 'https://udemy-react-d3.firebaseio.com/ages.json';

  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const svg = d3.select(d3Container.current);
        console.log({ props });

        const rects = svg.selectAll('rect').data(props.data);

        //EXIT
        rects
          .exit()
          .transition()
          .duration(500)
          .attr('height', 0)
          .remove()
          .attr('fill', 'transparent');

        rects
          .enter()
          .append('rect')
          .attr('x', (d, i) => i * 50)
          .attr('y', 50)
          .attr('width', 20)
          .transition()
          .duration(500)
          .attr('height', d => 100 + d.age * 4)
          .attr('fill', d => {
            return d.age > 10 ? 'red' : 'green';
          });
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props]
  );

  return (
    <svg className="d3-component" width={800} height={200} ref={d3Container} />
  );
};

export default D3Hooks;
