import React from "react";
//Подключаем use-hook-form
import { useForm } from "react-hook-form";
import searchLoop from "./search.svg";
import styles from "./SearchCard.module.css";

export default function SearchCard({ handleSearch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  function onSubmit(data) {
    handleSearch(data);
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={styles.input}
          placeholder={"Name or tel"}
          {...register("search", { required: true })}
        />
        <button className={styles.btn}>
          <img src={searchLoop} alt="search" className={styles.img} />
        </button>
      </form>
      {errors.search?.type === "required" && (
        <span className={styles.error}>This field is required</span>
      )}
    </>
  );
}
