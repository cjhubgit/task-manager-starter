import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import TaskAssignmentForm from '../components/TaskAssignmentForm';

Chart.register(...registerables);

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      const tasksRes = await fetch('/api/tasks');
      const teachersRes = await fetch('/api/users/teachers');
      setTasks(await tasksRes.json());
      setTeachers(await teachersRes.json());
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [{
      label: 'Task Completion',
      data: [75, 50, 90],
      borderColor: '#4CAF50'
    }]
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Task Completion Progress</h3>
        <Line data={chartData} />
      </div>

      <TaskAssignmentForm />

      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}