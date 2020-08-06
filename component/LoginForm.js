import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { addUser } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
export default function LoginForm() {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(addUser(data, "/api/login"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          className={styles.input}
          ref={register({ required: true })}
        />
        <p className={styles.error}>{errors.email && "Email is required"}</p>
      </div>
      <div className={styles.formGroup}>
        <input
          name="password"
          placeholder="Password"
          type="password"
          className={styles.input}
          ref={register({ required: true })}
        />
        <p className={styles.error}>
          {errors.password && "Password is required"}
        </p>
      </div>
      <div className="mt2 flex">
        <input
          type="submit"
          className={`${styles.button} ${styles.buttonCurve}`}
        />
      </div>
      {loading ? <p>loading</p> : <p className={styles.error}>{error}</p>}
    </form>
  );
}
