import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import CreateListModal from "../component/CreateListModal";
import CreateTaskModal from "../component/CreateTaskModal";
import { removeUser } from "../redux/Action";
import Link from "next/link";
import { openModal } from "./../redux/Action";
import Router from "next/router";
export default function Main(props) {
  const { name, id, loading } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !id) {
      router.push("/login"); //reroutes unauthourized user
    }
  }, [id, loading]);
  return (
    <React.Fragment>
      <Head>
        <title>Todo</title>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.profile}>
          <img
            src="/svg/user.svg"
            onClick={() => setShowProfile(!showProfile)}
            className="cursor"
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
              className="text--cancel cursor"
            >
              Logout
            </div>
          </div>
        </div>
        <Link href="/">
          <a>
            <h1 className={styles.h1}>Todo</h1>
          </a>
        </Link>
        {props.back && (
          <div
            onClick={() => Router.push(`${props.back}`)}
            className={styles.back}
          >
            <img src="/svg/back.svg" alt="back arrow" />
          </div>
        )}
      </nav>
      <div className={styles.main}>
        <div className={styles.containerFluid}>{props.children}</div>
      </div>
      {props.createList && <CreateListModal />}
      {props.createList && (
        <div
          onClick={() => dispatch(openModal())}
          id="yourAppElement"
          className={styles.create}
        >
          <img src="/svg/createList.svg" alt="edit" />
        </div>
      )}
      {props.createTask && <CreateTaskModal />}
      {props.createTask && (
        <div
          onClick={() => dispatch(openModal(null, { task: props.task }))}
          className={styles.create}
        >
          <img src="/svg/createList.svg" alt="edit" />
        </div>
      )}
    </React.Fragment>
  );
}
