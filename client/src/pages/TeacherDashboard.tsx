import { useState, useEffect } from 'react';
import CommentSection from '../components/CommentSection';

export default function TeacherDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch('/api/tasks/my-tasks');
      setTasks(await response.json());
    };
    loadTasks();
  }, []);

  const handleCommentSubmit = async (taskId: string) => {
    await fetch(`/api/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ message: newComment }),
      headers: { 'Content-Type': 'application/json' }
    });
    setNewComment('');
  };

  return (
    <div className="dashboard">
      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p className={task.status === 'pending' ? 'warning' : 'success'}>
            {task.status === 'pending' 
              ? `Due in ${Math.ceil((new Date(task.deadline) - Date.now()) / (1000 * 3600 * 24))} days`
              : 'Completed'}
          </p>
          <CommentSection comments={task.comments} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add comment..."
          />
          <button onClick={() => handleCommentSubmit(task._id)}>
            Post Comment
          </button>
        </div>
      ))}
    </div>
  );
}