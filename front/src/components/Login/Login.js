import React from "react";
// Использую библиотеку react-hook-form
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import logo from "./snapsvg-seeklogo.com.svg";

export default function Login({ sendLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  function onSubmit(data) {
    sendLogin(data);
  }
  return (
    <>
      <div className={styles.login}>
        <img src={logo} alt={"Просто лого"} className={styles.logo} />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={styles.label}>
            Email address
            <input
              type="email"
              id={"email"}
              className={styles.input}
              placeholder={"Your email"}
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className={styles.error}>This field is required</span>
            )}
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </label>
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              id={"password"}
              className={styles.input}
              placeholder={"Your password"}
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <span className={styles.error}>This field is required</span>
            )}
          </label>

          <button className={styles.btn}>Log In</button>
        </form>
      </div>
    </>
  );
}
