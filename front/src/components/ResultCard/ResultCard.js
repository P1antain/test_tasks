import React from "react";
import styles from "./ResultCard.module.css";
import deleteBtn from "./delete.svg";
import editBtn from "./edit.svg";
import doneBtn from "./done.svg";
import { useForm } from "react-hook-form";

export default function ResultCard({ card, deleteCard, handleDataEdit }) {
  const [inBurger, setBurger] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  function handleDelete() {
    deleteCard(card);
  }
  function handleEdit() {
    setBurger(!inBurger);

  }
  function onSubmit(data) {
    handleDataEdit(data, card);
    setBurger(!inBurger);
  }

  return (
    <>
      <li className={styles.list}>
        <div className={styles.block}>
          {" "}
          <span className={styles.name}>{card.name}</span>
        </div>

        <div className={styles.block}>
          {" "}
          <span className={styles.tel}>{card.tel}</span>
        </div>

        <div className={styles.block}>
          <button className={styles.btn} onClick={handleEdit}>
            <img src={editBtn} alt="edit" className={styles.image} />
          </button>
          <button className={styles.btn} onClick={handleDelete}>
            <img src={deleteBtn} alt="delete" className={styles.image} />
          </button>
        </div>
      </li>
      <form
        className={`${styles.form} ${inBurger ? `${styles.form_active}` : ""} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={styles.edit}>Edit contact:</span>
        <label htmlFor="nameID" className={styles.label}>
          New name:
          <input
            type="text"
            id={"nameID"}
            className={styles.input}
            {...register("name", { required: true })}
          />
        </label>
        {errors.name?.type === "required" && (
          <span className={styles.error}>This field is required</span>
        )}
        <label htmlFor="telID" className={styles.label}>
          New tel:
          <input
            type="text"
            id={"telID"}
            className={styles.input}
            {...register("tel", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value:
                  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
                message: "This is not a phone number",
              },
            })}
          />
        </label>
        {errors.tel && (
          <span className={styles.error}>{errors.tel.message}</span>
        )}
        <button className={styles.btn}>
          <img src={doneBtn} alt="Save" className={styles.image} />
        </button>
      </form>
    </>
  );
}
