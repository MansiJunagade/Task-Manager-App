// --- 📁 client/components/Header.js ---
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header style={{ padding: '10px 20px', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <h3 onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Task Manager</h3>
      <nav>
        {isLoggedIn ? (
          <>
            <button onClick={() => router.push('/dashboard')} style={{ marginRight: '10px' }}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push('/login')} style={{ marginRight: '10px' }}>Login</button>
            <button onClick={() => router.push('/register')}>Register</button>
          </>
        )}
      </nav>
    </header>
  );
}
