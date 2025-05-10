// --- 📁 client/pages/createTask.js ---
import { useEffect, useState } from 'react';
import { createTask, getUsers } from '../utils/api';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        if (data?.users) {
          setUsers(data.users);
        } else {
          setError('Unable to fetch users');
        }
      } catch (err) {
        console.error(err);
        setError('Error loading users');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const task = { title, description, dueDate, priority, assignedTo };
    try {
      const data = await createTask(task, token);
      if (data?._id) {
        router.push('/dashboard');
      } else {
        alert('Error creating task');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  };

  return (
    <>
      <Header />
      <h2 style={{ padding: '20px' }}>Create Task</h2>
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <br /><br />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <br /><br />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value=''>-- Assign to user --</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <br /><br />
        <button type="submit">Create Task</button>
      </form>
    </>
  );
}
