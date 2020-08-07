import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import CreateListModal from "../component/CreateListModal";
import CreateTaskModal from "../component/CreateTaskModal";
import { removeUser } from "../redux/Action";
export default function Main(props) {
  const { name, id, loading } = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !id) {
      router.push("/login");
    }
  }, [id, loading]);
  return (
    <React.Fragment>
      <nav className={styles.nav}>
        <div className={styles.profile}>
          <img
            src="/svg/user.svg"
            onClick={() => setShowProfile(!showProfile)}
            alt="profile"
          />
          <div
            className={`${styles.more} ${
              showProfile ? styles.show : styles.none
            }`}
          >
            <p className={styles.username}>{name}</p>
            <div className={styles.hr}></div>
            <div
              onClick={() => dispatch(removeUser())}
              className="text--cancel"
            >
              Logout
            </div>
          </div>
        </div>
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
