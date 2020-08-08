import RegisterAndLogin from "../layout/RegisterAndLogin";
import Link from "next/link";
import RegisterForm from "./../component/RegisterForm";
export default function Register() {
  return (
    <RegisterAndLogin
      title="Sign up"
      suggestion={
        <React.Fragment>
          <p>Already have an account? </p>
          <span>
            <Link href="/login">
              <a className="text--bold">Login</a>
            </Link>
          </span>
        </React.Fragment>
      }
    >
      <RegisterForm />
    </RegisterAndLogin>
  );
}
