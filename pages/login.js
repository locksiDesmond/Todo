import React from "react";
import RegisterAndLogin from "./../layout/RegisterAndLogin";
import Link from "next/link";
import LoginForm from "../component/LoginForm";

export default function Login() {
  return (
    <RegisterAndLogin
      title="Login"
      suggestion={
        <React.Fragment>
          <p>Don't have an account?</p>
          <span>
            <Link href="/register">
              <a>Create an account</a>
            </Link>
          </span>
        </React.Fragment>
      }
    >
      <LoginForm />
    </RegisterAndLogin>
  );
}
