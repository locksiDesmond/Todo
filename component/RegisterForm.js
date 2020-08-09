import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { addUser } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
export default function RegisterForm() {
  // @desc allow user to sign up with email, password and name
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(addUser(data, "/api/register")); // send user's form data for authentication
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label} for="name"></label>
        <input
          name="name"
          id="name"
          className={styles.input}
          placeholder="Username"
          ref={register({ required: true })}
        />
        <p className={styles.error}>{errors.name && "Username is required"}</p>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} for="email"></label>
        <input
          name="email"
          id="email"
          placeholder="Email"
          type="email"
          className={styles.input}
          ref={register({ required: true })}
        />
        <p className={styles.error}>{errors.email && "Email is required"}</p>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} for="password"></label>
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
          type="submit"
          disabled={loading ? "value" : null}
          className={`${styles.button} ${styles.buttonCurve}`}
        />
      </div>
      <p>
        {loading && (
          <div className="flex flex--center mt--2">
            <Loader type="Oval" color="#00BFFF" height={40} width={40} />
          </div>
        )}
      </p>
      <p className={styles.error}>{error}</p>
    </form>
  );
}
