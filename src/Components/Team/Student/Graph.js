import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Number of Students',
            data: Object.values(data),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph;
