import styles from "../styles/Card.module.css";
import { useDispatch } from "react-redux";
import { toggleTask } from "./../redux/Action";
export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(toggleTask(task._id));
  };
  return (
    <div className={`${styles.taskCard} ${!task && styles.wrapper}`}>
      <div className={styles.checkbox}>
        {task ? (
          <input
            type="checkbox"
            checked={task.checked}
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
            {task && task.date}
          </span>
        </div>
        <p className={`${styles.description} ${!task && styles.animate}`}>
          {task && task.description}
        </p>
      </div>
    </div>
  );
}
