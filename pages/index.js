import Main from "./../layout/Main";
import { useState, useEffect } from "react";
import styles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";
import ListCard from "./../component/ListCard";
import CreateListModal from "./../component/CreateListModal";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "./../redux/Action";
import isArrayEmpty from "./../lib/isArrayEmpty";
export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { lists, pending } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList());
  }, []);
  return (
    <Main createList>
      <CreateListModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <div className="flex flex--space-between mb--1">
        <p className="title"> List</p>
        <button
          onClick={() => setModalIsOpen(true)}
          className={`${formStyles.button} button--box-shadow width--auto`}
        >
          Create list
        </button>
      </div>
      <div className={styles.cards}>
        {pending ? (
          new Array(4)
            .fill(null)
            .map((item, index) => <ListCard key={index} data={item} />)
        ) : isArrayEmpty(lists) ? (
          <p>you need to post item </p>
        ) : (
          lists.map((item, index) => (
            <ListCard
              handleClick={() => setModalIsOpen(true)}
              key={index}
              data={item}
            />
          ))
        )}
      </div>
    </Main>
  );
}
