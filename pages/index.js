import Main from "./../layout/Main";
import { useEffect } from "react";
import styles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";
import ListCard from "./../component/ListCard";
import { useSelector, useDispatch } from "react-redux";
import { getList, openModal } from "./../redux/Action";
import isArrayEmpty from "./../lib/isArrayEmpty";
export default function Home() {
  const { lists, fetching } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList()); //gets lists
  }, []);
  return (
    <Main createList>
      <div className="flex flex--space-between flex--align-center mb--1">
        <h2 className="text--bold ml--1">Lists</h2>
        <button
          onClick={() => dispatch(openModal())}
          className={`${formStyles.button} button--box-shadow width--auto bg--create button--md`}
        >
          Create list
        </button>
      </div>
      {fetching ? (
        <div className={styles.cards}>
          {new Array(4).fill(null).map((item, index) => (
            <ListCard key={index} data={item} />
          ))}
        </div>
      ) : isArrayEmpty(lists) ? (
        <p className="flex flex--center"> You have no todo list</p>
      ) : (
        <div className={styles.cards}>
          {lists.map((item, index) => (
            <ListCard key={index} data={item} />
          ))}
        </div>
      )}
    </Main>
  );
}
