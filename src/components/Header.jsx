import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Home.module.scss';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logoIcon}>
          <img src="https://img.icons8.com/?size=100&id=21240&format=png&color=000000" alt="Logo Icon" />
        </div>
        <div className={styles.headerTitle}>My Mart</div>
        <nav className={styles.topIcons}>
          <a>🔍</a>
          <a>❤️</a>
          <a>🛒</a>
          <a>👤</a>
          <span className={styles.language}>ENG </span>
          {!user ? (
            <>
              <span className={styles.authLink} onClick={() => router.push('/login')}>
                Login
              </span>
              <span className={styles.authLink} onClick={() => router.push('/signup')}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              <span className={styles.userName}>Hello, {user.name}</span>
              <span className={styles.authLink} onClick={() => logout()}>
                Logout
              </span>
            </>
          )}
        </nav>
      </div>

      <nav className={styles.navBar}>
        <a>SHOP</a>
        <a>SKILLS</a>
        <a>STORIES</a>
        <a>ABOUT</a>
        <a>CONTACT US</a>
      </nav>
    </header>
  );
}