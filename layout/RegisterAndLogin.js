import { useEffect } from "react";
import styles from "../styles/Layout.module.css";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
export default function RegisterAndLogin(props) {
  const { id, loading } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!loading && id) {
      router.push("/");
    }
  }, [id, loading]);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p className={styles.title}>{props.title}</p>
        </div>
        <div>{props.children}</div>
        <div className={styles.suggestion}>{props.suggestion}</div>
      </div>
    </div>
  );
}
