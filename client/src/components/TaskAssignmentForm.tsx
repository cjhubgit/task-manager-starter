import { useState } from 'react';
import { api } from '../services/api';

export default function TaskAssignmentForm() {
  const [week, setWeek] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tasks', {
      week: parseInt(week),
      description,
      deadline: new Date().toISOString() // Replace with date picker
    });
    setWeek('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="number"
        placeholder="Week Number"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Assign Task</button>
    </form>
  );
}