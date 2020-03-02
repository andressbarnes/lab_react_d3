import React, { useState } from 'react';
import useInterval from '../../hooks/useInterval';
import RBarChart from './RBarChart';
import { Button, Segment } from 'semantic-ui-react';

const getRandomArrayIndex = array => {
  return Math.floor(array.length * Math.random());
};

const RacingBarChart = () => {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: 'Love it',
      value: 10,
      color: '#21ba45'
    },
    {
      name: 'Pretty Neat',
      value: 10,
      color: '#2185d0'
    },
    {
      name: 'Wait What?',
      value: 10,
      color: '#f2711c'
    },
    {
      name: 'Meh',
      value: 10,
      color: '#db2828'
    }
  ]);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomArrayIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10
              }
            : entry
        )
      );
      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <div>
      <Segment>
        Data: [{data.map(e => `{name:${e.name}, value: ${e.value}} , `)}]
      </Segment>
      <RBarChart data={data} start={start} />
      <Button size="tiny" as="a" primary onClick={() => setStart(!start)}>
        {`${!start ? 'Start' : 'Stop'} Race`}
      </Button>
      <p>Iteration: {iteration}</p>
    </div>
  );
};

export default RacingBarChart;
