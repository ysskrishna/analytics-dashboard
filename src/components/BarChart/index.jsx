import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ x, y, layout }) => {
  const data = [
    {
      x: x,
      y: y,
      type: 'bar',
    },
  ];

  return (
    <div className='flex-1 flex flex-col'>
      <Plot
        data={data}
        layout={layout}
        useResizeHandler
        className='self-center w-[95%] h-[400px] min-w-[320px] mx-2'
      />
    </div>
  );
};

export default BarChart;
