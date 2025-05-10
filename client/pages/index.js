import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Welcome to Task Manager</h2>
        <p>
          Please <Link href="/login">Login</Link> or <Link href="/register">Register</Link> to continue.
        </p>
      </div>
    </>
  );
}