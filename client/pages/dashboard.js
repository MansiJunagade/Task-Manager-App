// --- 📁 client/pages/dashboard.js ---
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect if no token
      return;
    }
    axios
      .get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Dashboard</h2>
        <button
          onClick={() => router.push('/createTask')}
          style={{ marginBottom: '20px' }}
        >
          + Create New Task
        </button>
        <h3>Created Tasks</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
                <p><strong>{task.title}</strong></p>
                <p>{task.description}</p>
                - Assigned to:{' '}
                {task.assignedTo?.name || 'Unassigned'}
              </div>

            </li>
          )
          )}
        </ul>

      </div>
    </>
  );
}
