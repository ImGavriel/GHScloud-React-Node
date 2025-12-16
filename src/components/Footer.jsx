import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <a href="#" className={styles.twitter} aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className={styles.facebook} aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className={styles.youtube} aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="#" className={styles.instagram} aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div className={styles.info}>
        <h3 className={styles.logo}>
          Global Host Solutions <span className={styles.ghs}>| GHS</span>
        </h3>
        <p className={styles.sub}>פתרונות אחסון וענן מתקדמים לעולם החדש</p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} GHS Cloud — כל הזכויות שמורות.
        </p>
      </div>


      <div className={styles.glowbar}></div>
    </footer>
  );
}
