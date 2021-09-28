import React from "react";
import ResultCard from "../ResultCard/ResultCard";
import styles from "./Cabinet.module.css";
import SearchCard from "../SearchCard/SearchCard";
import NewCard from "../NewCard/NewCard";

export default function Cabinet({ inDataPost, deleteCard, handleSearch, handleNewContact, handleDataEdit }) {
  return (
    <>
      <div className={styles.page}>
        <SearchCard handleSearch={handleSearch} />
        <NewCard handleNewContact={handleNewContact}/>
        <ul className={styles.list}>
          {inDataPost.map((card) => {
            return (
              <ResultCard card={card} key={card.id} deleteCard={deleteCard} handleDataEdit={handleDataEdit} />
            );
          })}
        </ul>
      </div>
    </>
  );
}
