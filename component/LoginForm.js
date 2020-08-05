import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
export default function LoginForm() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
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
    </form>
  );
}
