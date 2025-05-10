import { useState } from 'react';
import { registerUser } from '../utils/api';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser({ name, email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/login');
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <Header />
      <h2 style={{ padding: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
