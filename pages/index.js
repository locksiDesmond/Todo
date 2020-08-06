import Main from "./../layout/Main";
import styles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";
import ListCard from "./../component/ListCard";
export default function Home() {
  return (
    <Main createList>
      <div className="flex flex--space-between mb--1">
        <p className="title"> List</p>
        <button
          className={`${formStyles.button} button--box-shadow width--auto`}
        >
          Create list
        </button>
      </div>
      <div className={styles.cards}>
        <ListCard title="All" noOfTask="3" />
        <ListCard title="All" noOfTask="3" />
        <ListCard />
        <ListCard />
        <ListCard />
      </div>
    </Main>
  );
}
