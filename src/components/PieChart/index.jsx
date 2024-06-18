import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({ values, labels, layout }) => {
  const data = [
    {
      values: values,
      labels: labels,
      type: 'pie',
    },
  ];

  return (
    <div className='flex-1 flex flex-col'>
      <Plot
        data={data}
        layout={layout}
        useResizeHandler
        className='self-center w-[95%] h-[600px] min-w-[320px] mx-2'
      />
    </div>
  );
};

export default PieChart;
