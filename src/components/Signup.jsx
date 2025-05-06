import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !name) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const success = await signup(username, password, name);
      if (success) {
        router.push('/');
      }
    } catch (error) {
      setError(error.message || 'Signup failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.authForm}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Sign Up</button>
        <p>
          Already have an account?{' '}
          <a onClick={() => router.push('/login')} className={styles.authLink}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}