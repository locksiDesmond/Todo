import React from "react";
import styles from "../styles/Layout.module.css";

export default function RegisterAndLogin(props) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p className={styles.title}>{props.title}</p>
        </div>
        <div className={styles.childrenContainer}>{props.children}</div>
        <div className={styles.suggestion}>{props.suggestion}</div>
      </div>
    </div>
  );
}
