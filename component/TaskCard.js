import styles from "../styles/Card.module.css";
import { useDispatch } from "react-redux";
import { toggleTask } from "./../redux/Action";
import { DateConversion } from "./../lib/DateConversion";
import Router from "next/router";
export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(toggleTask(task._id));
  };
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };
  const handleClick = (e) => {
    Router.push(`/task/${task._id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={`${styles.taskCard} ${!task && styles.wrapper}`}
    >
      <div className={styles.checkbox}>
        {task ? (
          <input
            type="checkbox"
            checked={task.checked}
            onClick={handleCheckboxClick}
            onChange={handleChange}
          />
        ) : (
          <div className={`${styles.animate} ${styles.checkboxTemplate}`}></div>
        )}
      </div>
      <div className={styles.titleAndDescription}>
        <div className={styles.titleAndDate}>
          <p className={`${styles.taskTitle} ${!task && styles.animate}`}>
            {task && task.title}
          </p>

          <span className={`${styles.date} ${!task && styles.animate}`}>
            {task && DateConversion(task.date_created)}
          </span>
        </div>
        <p className={`${styles.description} ${!task && styles.animate}`}>
          {task && task.description}
        </p>
      </div>
    </div>
  );
}
