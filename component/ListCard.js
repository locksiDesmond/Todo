import { useState } from "react";
import styles from "../styles/Card.module.css";
import Router from "next/router";
export default function ListCard({ data }) {
  const [showDelete, setShowDelete] = useState(false);
  const handleRoute = (e) => {
    if (data) {
      Router.push(`/tasks/${data._id}`);
    }
  };
  return (
    <div
      onClick={handleRoute}
      className={`${styles.card} hover ${!data && styles.wrapper}`}
    >
      <p className={`${styles.title} ${!data && styles.animate}`}>
        {data.title}
      </p>
      <div className={`${styles.task} ${!data && styles.animate}`}>
        {data.no_of_task && data.no_of_task + " Tasks"}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowDelete(!showDelete);
          }}
          className={`${styles.hambugger} hover_item `}
        >
          <img src="/svg/more.svg" className={styles.img} alt="more" />
        </span>
      </div>
      <div
        className={`${styles.more} ${showDelete ? styles.show : styles.none}`}
      >
        <p className="label label--sm bg--cancel">Delete</p>
      </div>
    </div>
  );
}
