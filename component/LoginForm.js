import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { addUser } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
export default function LoginForm() {
  // @desc allows a user to log in with email and password
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(addUser(data, "/api/login")); // submit user's form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label for="email">&nbsp;</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          className={styles.input}
          ref={register({ required: true })}
        />
        <p className={styles.error}>{errors.email && "Email is required"}</p>
      </div>
      <div className={styles.formGroup}>
        <label for="password">&nbsp;</label>
        <input
          id="password"
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
          disabled={loading ? "value" : null}
          type="submit"
          className={`${styles.button} ${styles.buttonCurve}`}
        />
      </div>
      {loading ? (
        <div className="flex flex--center mt--2">
          <Loader type="Oval" color="#00BFFF" height={40} width={40} />
        </div>
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </form>
  );
}
