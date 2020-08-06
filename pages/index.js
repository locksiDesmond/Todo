import Main from "./../layout/Main";
import { useState } from "react";
import styles from "../styles/Card.module.css";
import formStyles from "../styles/Form.module.css";
import ListCard from "./../component/ListCard";
import CreateListModal from "./../component/CreateListModal";
import { useSelector } from "react-redux";
export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { lists } = useSelector((state) => state.list);
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
        {lists.map((item, index) => (
          <ListCard key={index} data={item} />
        ))}
      </div>
    </Main>
  );
}
