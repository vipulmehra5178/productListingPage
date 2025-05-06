import styles from '../styles/Home.module.scss';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerSection}>
          <h4>BE THE FIRST TO KNOW</h4>
          <p>Sign up for updates from mettä muse.</p>
          <div className={styles.subscribe}>
            <input type="email" placeholder="Enter your e-mail..." />
            <button>SUBSCRIBE</button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4>mettä muse</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Stories</a></li>
            <li><a href="#">Artisans</a></li>
            <li><a href="#">Boutiques</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">EU Compliances Docs</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#">Orders & Shipping</a></li>
            <li><a href="#">Join/Login as a Seller</a></li>
            <li><a href="#">Payment & Pricing</a></li>
            <li><a href="#">Return & Refunds</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>CONTACT US</h4>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h4>CURRENCY</h4>
          <p className={styles.currency}>
            <span role="img" aria-label="US flag">🇺🇸</span> USD
          </p>
          <p className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference is available on hover.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>FOLLOW US</h4>
          <div className={styles.socialIcons}>
            <a href="#"><span role="img" aria-label="Instagram">📷</span></a>
            <a href="#"><span role="img" aria-label="LinkedIn">🔗</span></a>
          </div>
          <h4>mettä muse ACCEPTS</h4>
          <div className={styles.paymentIcons}>
            <span role="img" aria-label="Google Pay">💳</span>
            <span role="img" aria-label="Visa">💳</span>
            <span role="img" aria-label="PayPal">💳</span>
            <span role="img" aria-label="Amex">💳</span>
            <span role="img" aria-label="Apple Pay">💳</span>
            <span role="img" aria-label="DPay">💳</span>
          </div>
        </div>
      </footer>

      <div className={styles.copyright}>
        <p>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>
    </>
  );
}