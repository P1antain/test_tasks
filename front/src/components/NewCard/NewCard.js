import React from "react";
//Подключаем use-hook-form
import { useForm } from "react-hook-form";
import styles from "./NewCard.module.css";

export default function NewCard({handleNewContact}) {
  const [openContact, setOpenContact] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  function onSubmit(data) {
    handleNewContact(data);
  }
  function handleClick(){
    setOpenContact(!openContact)
  }

  return (
    <>
      <button className={styles.burger} onClick={handleClick}>New contact</button>
      <form className={`${styles.form} ${openContact ? `${styles.form_active}`: ''} `} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className={styles.label}>
          Name
          <input
            type="text"
            id={"name"}
            className={styles.input}
            placeholder={"Ivanov Ivan"}
            {...register("name", { required: true })}
          />
        </label>
          {errors.name?.type === "required" && (
              <span className={styles.error}>This field is required</span>
          )}
        <label htmlFor="tel" className={styles.label}>
          Telephone number
          <input
            type="tel"
            id={"tel"}
            className={styles.input}
            placeholder={"+79996661234"}
            {...register("tel", {
              required: {
                value: true,
                message: 'This field is required'
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
        <button className={styles.btn}>New contact</button>
      </form>
    </>
  );
}
