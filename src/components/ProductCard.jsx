import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const isOutOfStock = product.rating.count < 20;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} />
      </div>
      {isOutOfStock && <div className={styles.overlay}>Out of Stock</div>}
      <div className={styles.info}>
        <h4>{product.title}</h4>
        {user ? (
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        ) : (
          <p className={styles.loginPrompt}>Login to see price</p>
        )}
      </div>
    </div>
  );
}