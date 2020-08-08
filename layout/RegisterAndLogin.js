import { useEffect } from "react";
import Head from "next/head";
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
      <Head>
        <title>Todo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A todo list app" />
      </Head>
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
