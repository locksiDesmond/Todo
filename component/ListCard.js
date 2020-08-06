import styles from "../styles/Card.module.css";

export default function ListCard(props) {
  return (
    <div className={`${styles.card} ${!props.title && styles.wrapper}`}>
      <p className={`${styles.title} ${!props.title && styles.animate}`}>
        {props.title}
      </p>
      <span className={`${styles.task} ${!props.title && styles.animate}`}>
        {props.noOfTask && props.noOfTask + " Tasks"}
      </span>
    </div>
  );
}
// <div className={`${styles.card}  ${!props.title && styles.animate}`}>
//   <p className={styles.title}>{props.title}</p>
//   <span className={styles.task}>
//     {props.noOfTask && props.noOfTask + " Tasks"}
//   </span>
// </div>
