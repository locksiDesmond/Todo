import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Layout.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
export default function Main(props) {
  const { id, loading } = useSelector((state) => state.user);
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
      {props.createList && (
        <Link href="/createlist">
          <a>
            <div className={styles.create}>
              <img src="/svg/createList.svg" alt="edit" />
            </div>
          </a>
        </Link>
      )}
    </React.Fragment>
  );
}
