// const API_BASE = 'http://localhost:5000/api';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return await res.json();
};

// Login a user
export const loginUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return await res.json();
};

// Get all tasks
export const getTasks = async (token) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// Create a new task
export const createTask = async (taskData, token) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  return await res.json();
};

// Get all users (for assigning tasks)
export const getUsers = async (token) => {
  const res = await fetch(`${API_BASE}/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      cache: 'no-store',
    },
  });

  return await res.json();
};
