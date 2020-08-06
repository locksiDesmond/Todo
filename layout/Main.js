import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Layout.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import CreateListModal from "../component/CreateListModal";
import CreateTaskModal from "../component/CreateTaskModal";
export default function Main(props) {
  const { id, loading } = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const router = useRouter();
  //   useEffect(() => {
  //     if (!loading && !id) {
  //       router.push("/login");
  //     }
  //   }, [id, loading]);
  return (
    <React.Fragment>
      <nav className={styles.nav}>
        <div className={styles.profile}></div>
        <h1 className={styles.h1}>Todo</h1>
      </nav>
      <div className={styles.main}>
        <div className={styles.containerFluid}>{props.children}</div>
      </div>
      <CreateListModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <CreateTaskModal
        task={props.task}
        isOpen={taskModalIsOpen}
        closeModal={() => setTaskModalIsOpen(false)}
      />
      {props.createList && (
        <div
          onClick={() => setModalIsOpen(true)}
          id="yourAppElement"
          className={styles.create}
        >
          <img src="/svg/createList.svg" alt="edit" />
        </div>
      )}
      {props.createTask && (
        <div onClick={() => setTaskModalIsOpen(true)} className={styles.create}>
          <img src="/svg/createList.svg" alt="edit" />
        </div>
      )}
    </React.Fragment>
  );
}
