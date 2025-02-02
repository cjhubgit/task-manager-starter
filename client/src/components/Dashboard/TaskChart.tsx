// TaskChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const TaskChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Task Completion Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default TaskChart;
